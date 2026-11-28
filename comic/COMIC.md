# Daily wordless comic Shorts (Xoji's plan from 2026-11-28; replaces the history videos)

Xoji (2026-11-28): history videos got few views, so the channel switches to funny cartoon Shorts.
5 Shorts every day, NO long videos. Every Short has NEW original characters and a NEW funny scenario,
and NO words (no speech, no on-screen text), so people in every country understand it.
Style reference Xoji liked: an AI-made clip of two dogs cooking (setup -> trick -> backfire -> laugh).
We cannot make photo-real AI video for free, so we make 2D cartoons in code (free, original, no copyright risk).

## Lock
If `out/<date>/WORKING.lock` exists and is less than 3 hours old, another session is making that day's episodes right now:
do NOT make new episodes for that day; only upload finished ones whose upload.json status is pending.
The session that made the lock deletes it when done.

## Make one episode
1. Write `episodes/epNN-<slug>.js` (copy the shape of `episodes/ep01-last-slice.js`). It defines:
   `DUR` (20-40 s), `THUMB_T`, `CUES` [[time,'sfx'],...], `MUSIC` {bpm, duck:[[from,to],...]}, and `scene(t)`.
2. Check frames: `node engine/render.js episodes/epNN.js preview /tmp/pv 1,3,5,...` and LOOK at them (contact sheet).
   Fix overlaps, things off screen, characters drawn behind/in front wrongly.
3. Sound: `node engine/render.js episodes/epNN.js meta > /tmp/meta.json && python3 engine/sfx.py /tmp/meta.json /tmp/epNN.wav`
4. Video: `node engine/render.js episodes/epNN.js /tmp/epNN.mp4 /tmp/epNN.wav` (~1 min for 28 s) and
   thumb: `node engine/render.js episodes/epNN.js thumb /tmp/epNN.thumb.jpg`. Extract 10+ stills of the final mp4 and look.
5. Save to `out/<YYYY-MM-DD>/` (mp4, thumb.jpg, upload.json), push to the repo (see Upload).

## Engine (engine/comic.html) cheat sheet
- `drawChar(spec, pose, t)`. spec: body color, w, h, legLen, armLen, hat (cap|top|bow|tuft|beanie|crown|none), hatColor,
  stache, cheeks, shoe. pose: x, y (feet), lift, rot, sx/sy (squash), flip, look [dx,dy], blink, eyes (normal|squint|big|x|spiral),
  brow (none|up|angry|sad), mouth (smile|grin|o|frown|flat|wide|laugh|chomp|whistle), armL/armR (degrees, + is up),
  reachL/reachR (rubber-arm extra length), bendL/bendR (arc), holdL/holdR (function that draws a prop at the hand), walk (phase).
- Props: pizza, crust, bird. Effects: sparkle, burst (impact star), mark('!'/'?'), sweat, heart, dizzy, speedLines, iris (ending),
  vignette, halftone. Camera: `withCam({x,y,z,rot,shake}, t, fn)`. Tween: `key(t,[[t0,v0],[t1,v1,'out'|'back'|'bounce'|'elastic']])`.
- New props/characters (cat, robot, granny, chef, dog, alien...) are drawn in the episode file with the same primitives (ell, rrect, line, path).
  If a new prop is reusable, add it to comic.html and list it here.
- SFX names (engine/sfx.py, all synthesized): ding whoosh sting creep tick alert whistle question suspense stretch pop clack boing pow bonk
  slideup slidedown thud flap zip tweet chomp snap laugh sadtrombone. Add new ones in sfx.py when a gag needs them.

## What makes it funny (rules for every episode)
- First 1 s: something already happening (zoom-out, flash, motion). No slow start.
- Structure: setup (want) -> trick 1 -> counter-trick (escalation) -> big physical gag -> twist ending (a third party wins, or a backfire) -> 1 s button.
- Big expressive faces, squash and stretch, anticipation before every jump, a sound on every action, camera shake on impacts.
- Every episode: new main characters (new body shapes, colors, accessories) and a new setting and situation.
  Ideas: gym, barber shop, exam, birthday cake, elevator, photo booth, cooking show, fishing, dentist, magic trick, wedding, airplane seat,
  bus stop, last parking spot, phone battery 1%, haunted house, snowball fight, robot vacuum, plant that grows, superhero landing fail.
- Rotate 3 formats so the channel never feels repeated (Xoji's 2nd example, 2026-11-28: a mole with a tiny camera goes down a hole
  and finds a secret underground neon party; hook = curiosity, payoff = surprise reveal):
  A) Rivalry slapstick (like ep01): two characters want one thing, tricks escalate, a third party wins.
  B) Secret-world reveal: "what really happens when nobody watches": follow something into a hidden place (inside a fridge at night,
     behind the washing machine, inside a piggy bank, under a sofa, inside a snowman) and reveal a surprising world (party, office, gym,
     tiny city). Use a POV/peek shot, slow tension with low sound, then a loud colorful reveal (neon lights, beat drop), then a twist when it gets caught.
  C) Backfire experiment (like the dog-wok example): a character tries a clever shortcut, it goes wrong in an unexpected way, a friend laughs.
  Do not copy the examples' exact ideas (no mole+camera, no dogs cooking with a battery); take the structure only.
- Keep it clean (no violence beyond cartoon bonks, no gross-out, no real brands/characters). Never copy existing cartoon characters.
- Title: short hook + 1-2 emoji + #shorts #funny #cartoon. Description: one-line story, a comment question with two emoji choices,
  "Follow for a new wordless cartoon every day." Category 23 (Comedy), made_for_kids false.

## Upload (Windsor.ai; see videos/daily/DAILY.md "Posting now goes through Windsor.ai")
- Push files to the session's claude/* branch of Sarvardev035/history-videos under `comic/<date>/`, check the raw URL returns 200.
- execute_action connector youtube, account 127147, action upload_video, privacy_status "public" (never private/scheduled).
- YouTube's free API quota is about 6 uploads a day for the whole channel (each upload costs 1,600 of 10,000 units).
  So 5 Shorts a day fits only if nothing else is uploaded. Upload after 08:10 UTC (13:10 Tashkent) when the quota resets.
- Write the video id into upload.json "status". Never upload a file twice. If rate-limited, leave "pending" and the next run retries first.

## Episode log (never repeat a character set or scenario)
- 2026-11-28 ep01 "The Last Slice": Bun (round orange, blue cap) vs Stretch (tall teal, mustache, hair tuft); last pizza slice; distraction trick,
  rubber-arm steal, tackle, a pigeon steals it, crust bonk, they share the crust, a gang of pigeons arrives. Kitchen. 28 s.
- 2026-11-28 ep02 "Midnight Fridge" (secret world): Pip (small green, blue beanie) sneaks to the fridge at night; food throws a neon party (eggs in sunglasses, cheese DJ, jelly, broccoli); Mama (big purple, pink bow) turns the light on, everyone freezes; party resumes. 23.6 s.
- 2026-11-28 ep03 "Balloon Gains" (backfire): Twig (skinny pink, red headband) can't lift a barbell, ties balloons to it, floats away; Brick (wide blue, black cap) laughs and gets the falling plates. Gym. 23.2 s.
- 2026-11-28 ep04 "The Only Shade" (rivalry): Melo (round yellow) vs Chili (tall red, green top hat) squeeze into one lamp-post shadow; umbrella escalation, Melo melts, Chili flies off on a giant umbrella, the sun moves the shade, rain cloud, they share the umbrella. Hot street. 24.4 s.
- 2026-11-28 ep05 "The Magic Hat" (backfire): Zibo (purple magician, mustache) pulls a fish, a sock, an angry chicken, then a giant glove pulls him into the hat; a bunny with his mustache pops out and pulls out a tiny Zibo. Theater stage. 23.4 s.
