# Free YouTube auto-upload: one-time setup (about 15 minutes)

The workflow `.github/workflows/youtube-upload.yml` uploads every new video listed in `<day>/upload.json`
with YouTube's own API, for free. It runs when a new upload.json is pushed, every 6 hours, or by hand
(Actions > Upload to YouTube > Run workflow). It schedules videos with YouTube's own "publish at" time.

Only you can do the steps below, because they need your Google account. Use the Google account that owns the YouTube channel.

## 1. Google Cloud project + YouTube API (2 clicks)
1. Open https://console.cloud.google.com/projectcreate , name it `history-videos`, press **Create**.
2. Open https://console.cloud.google.com/apis/library/youtube.googleapis.com , check the project at the top is `history-videos`, press **Enable**.

## 2. Consent screen
1. Open https://console.cloud.google.com/auth/branding and press **Get started**.
2. App name `history-videos uploader`, support email = your Gmail, **Next**. Audience **External**, **Next**. Contact email = your Gmail, **Next**, tick the agreement, **Create**.
3. Open https://console.cloud.google.com/auth/audience and press **Publish app** > **Confirm**.
   (Important: if you skip this, the login expires every 7 days and uploads stop.)

## 3. OAuth client
1. Open https://console.cloud.google.com/auth/clients/create
2. Application type **Web application**, name `uploader`.
3. Under **Authorized redirect URIs** press **Add URI** and paste: `https://developers.google.com/oauthplayground`
4. Press **Create**. Keep the window open: you need the **Client ID** and **Client secret**.

## 4. Get the refresh token (in the browser, no code)
1. Open https://developers.google.com/oauthplayground
2. Press the gear icon (top right), tick **Use your own OAuth credentials**, paste the Client ID and Client secret.
3. In the left box "Input your own scopes" paste:
   `https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl`
   and press **Authorize APIs**.
4. Choose the channel's Google account (and the channel itself, if asked).
   Google will warn "Google hasn't verified this app": press **Advanced** > **Go to history-videos uploader (unsafe)** > **Continue**/**Allow**.
   This warning is normal: it is your own app.
5. Press **Exchange authorization code for tokens**. Copy the **Refresh token** (starts with `1//`).

## 5. Save 3 secrets in GitHub
Open https://github.com/Sarvardev035/history-videos/settings/secrets/actions/new three times and add:
| Name | Value |
|---|---|
| `YT_CLIENT_ID` | the Client ID |
| `YT_CLIENT_SECRET` | the Client secret |
| `YT_REFRESH_TOKEN` | the refresh token |
Never paste these into a chat or a file: secrets stay only in GitHub.

## 6. Remove the "private only" lock (free audit form)
Truth: Google keeps videos uploaded by a NEW, unaudited API project **private** until the project passes a free
compliance audit. Fill in https://support.google.com/youtube/contact/yt_api_form
(choose "audit and quota extension"; describe it as: "personal tool that uploads my own history videos to my own channel
from GitHub Actions; no other users"). Approval usually takes a few days to a few weeks.
Until approval, keep Metricool for publishing; the daily run will switch to this uploader once you say the audit passed.

## Limits
- Free quota: 10,000 units per day. One upload costs about 1,600 units, captions 400, thumbnail 50, so 4 videos a day fits.
- Custom thumbnails need a phone-verified channel: https://www.youtube.com/verify
