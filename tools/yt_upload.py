"""Upload every video listed in <day>/upload.json to YouTube with the YouTube Data API v3.

Rules:
- Skips items whose "status" mentions Metricool or that already have "youtube_id".
- Skips a video whose title is already on the channel (checks the last 50 uploads), so nothing is posted twice.
- Future publish time: uploads as private with publishAt (YouTube publishes it at that time).
  Past publish time: uploads public right away.
- Writes youtube_id back into upload.json (the workflow commits it).
Secrets (env): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
"""
import glob, json, os, sys, datetime
from zoneinfo import ZoneInfo
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError

ET = ZoneInfo("America/New_York")
creds = Credentials(None, refresh_token=os.environ["YT_REFRESH_TOKEN"],
                    client_id=os.environ["YT_CLIENT_ID"], client_secret=os.environ["YT_CLIENT_SECRET"],
                    token_uri="https://oauth2.googleapis.com/token")
yt = build("youtube", "v3", credentials=creds, cache_discovery=False)

def channel_titles():
    ch = yt.channels().list(part="contentDetails,snippet", mine=True).execute()["items"][0]
    print("Channel:", ch["snippet"]["title"])
    pl = ch["contentDetails"]["relatedPlaylists"]["uploads"]
    items = yt.playlistItems().list(part="snippet", playlistId=pl, maxResults=50).execute().get("items", [])
    return {i["snippet"]["title"].strip().lower() for i in items}

def upload(day, it):
    path = os.path.join(day, it["file"])
    if not os.path.exists(path):
        print("  missing file, skip:", path); return None
    when = datetime.datetime.fromisoformat(it["publish_et"]).replace(tzinfo=ET)
    now = datetime.datetime.now(datetime.timezone.utc)
    status = {"selfDeclaredMadeForKids": False, "containsSyntheticMedia": True, "embeddable": True}
    if when > now + datetime.timedelta(minutes=20):
        status.update(privacyStatus="private", publishAt=when.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
    else:
        status["privacyStatus"] = "public"
    body = {"snippet": {"title": it["title"][:100], "description": it.get("description", "")[:4900],
                        "tags": it.get("tags", []), "categoryId": "27", "defaultLanguage": "en",
                        "defaultAudioLanguage": "en"}, "status": status}
    req = yt.videos().insert(part="snippet,status", body=body, notifySubscribers=True,
                             media_body=MediaFileUpload(path, mimetype="video/mp4", chunksize=8 * 1024 * 1024, resumable=True))
    resp = None
    while resp is None:
        st, resp = req.next_chunk()
        if st: print(f"  {int(st.progress() * 100)}%")
    vid = resp["id"]; print("  uploaded:", vid, status)
    base = path[:-4]
    if os.path.exists(base + ".thumb.jpg") and it.get("type") != "short":
        try: yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(base + ".thumb.jpg")).execute(); print("  thumbnail set")
        except HttpError as e: print("  thumbnail skipped (verify the channel by phone to allow custom thumbnails):", e.reason)
    if os.path.exists(base + ".en.srt"):
        try:
            yt.captions().insert(part="snippet", body={"snippet": {"videoId": vid, "language": "en", "name": "English"}},
                                 media_body=MediaFileUpload(base + ".en.srt", mimetype="application/octet-stream")).execute()
            print("  captions added")
        except HttpError as e: print("  captions skipped:", e.reason)
    return vid

def main():
    existing = channel_titles(); changed = False; errors = 0
    for uj in sorted(glob.glob("2*/upload.json")):
        day = os.path.dirname(uj); items = json.load(open(uj))
        for it in items:
            st = str(it.get("status", ""))
            if it.get("youtube_id") or "metricool" in st.lower():
                continue
            print(f"{day}/{it['file']}: {it['title']}")
            if it["title"].strip().lower() in existing:
                print("  already on the channel, skip"); it["status"] = "already on channel"; changed = True; continue
            try:
                vid = upload(day, it)
            except HttpError as e:
                print("  FAILED:", e); errors += 1
                if "quotaExceeded" in str(e) or "uploadLimitExceeded" in str(e): break
                continue
            if vid:
                it["youtube_id"] = vid; it["status"] = f"uploaded via YouTube API ({vid})"; changed = True
                existing.add(it["title"].strip().lower())
                json.dump(items, open(uj, "w"), indent=1, ensure_ascii=False)
        json.dump(items, open(uj, "w"), indent=1, ensure_ascii=False)
    print("changed" if changed else "nothing to upload")
    sys.exit(1 if errors else 0)

main()
