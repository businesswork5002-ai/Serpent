HEARTH — GITHUB + PERSONAL APK GUIDE
=======================================
(For your own use — not going through the Play Store)


WHAT'S IN THIS ZIP
-------------------
Every file sits flat, no folders — index.html, manifest.json, sw.js, and
a set of icon-*.png files. Upload them all into the same GitHub repo, no
folder structure to worry about.

privacy-policy.html and terms-of-use.html aren't needed for personal use —
ignore or delete them.


PART 1 — PUT IT ON GITHUB
----------------------------
1. Create a new repository (public, no README/gitignore/license needed).
2. On the repo page, choose "uploading an existing file".
3. Select every file from this zip (all of it — index.html, manifest.json,
   sw.js, all the icon-*.png files) and upload them together.
4. Commit changes.


PART 2 — TURN IT ON WITH GITHUB PAGES
------------------------------------------
1. Repo → Settings → Pages.
2. Source: "Deploy from a branch". Branch: main, folder: / (root). Save.
3. Wait about a minute, refresh — you'll get a URL like:
       https://yourusername.github.io/hearth-app/
   Open it on your phone to confirm the app loads and you can create a
   profile / see your code.


PART 3 — INSTALL IT LIKE A REAL APP (quickest option, no APK needed)
-------------------------------------------------------------------------
Android Chrome: open the URL → menu (⋮) → "Add to Home screen" / "Install
app". Real icon, opens full-screen, works offline. This might be all you
actually need.


PART 4 — BUILDING A REAL .APK FILE (all from your phone — no computer needed)
-----------------------------------------------------------------------------------
Use PWABuilder — it builds and signs the APK on their servers, so there's
nothing to install on your end:

1. On your phone, go to https://www.pwabuilder.com
2. Paste your GitHub Pages URL (from Part 2) into the box → tap Start.
3. It scans your manifest/service worker and shows a score for each
   platform. Don't worry about Windows/iOS — you only care about Android.
4. Tap "Package for stores".
5. Under Android, tap "Generate Package". Leave the default options unless
   you know you want to change something — the Package ID field can stay
   as whatever it suggests (e.g. com.hearth.twa).
6. It builds for a minute, then gives you a .zip to download. Inside that
   zip is your .apk file (there's also a .aab — that one's only needed for
   Play Store, ignore it).


PART 5 — INSTALL THE APK ON YOUR PHONE
-------------------------------------------
1. Find the downloaded .apk (Downloads folder, or wherever your browser
   saves files) and tap it.
2. Android will warn it's from an unknown source — normal for anything
   outside the Play Store. It'll prompt you to allow "Install unknown
   apps" for whichever app opened the file (Files, Chrome, etc.) — allow
   it when asked.
3. Tap Install. Hearth now shows up as a real app icon — same app, same
   code, just packaged natively. Camera, mic, and calling all work exactly
   like they did in the browser.


IF YOU'D RATHER USE A COMPUTER INSTEAD (Bubblewrap CLI)
------------------------------------------------------------
Optional alternative to Part 4, only if you have a laptop/desktop handy:
1. Install Node.js: https://nodejs.org
2. Install a Java JDK: https://adoptium.net (any recent LTS, e.g. 17)
3. npm i -g @bubblewrap/cli
4. bubblewrap init --manifest=https://yourusername.github.io/hearth-app/manifest.json
5. bubblewrap build  →  produces app-release-signed.apk
Same result as PWABuilder, just running locally instead of in the cloud.


KEEPING IT UPDATED
---------------------
Made more changes to index.html later? Just re-upload the new version to
the same GitHub repo — Pages picks it up within a minute or two. For a
new .apk with those changes, just re-run the PWABuilder steps again
against the same URL.


TROUBLESHOOTING
-------------------
- Camera/mic don't work → make sure you're on the https:// GitHub Pages
  URL, not a local file. Browsers block camera/mic on anything that isn't
  https:// (or localhost).
- "Add to Home Screen" doesn't show an install option → give it a minute
  after first opening the URL; also double check manifest.json and every
  icon-*.png actually uploaded (typos in filenames will silently break this).
- PWABuilder's Android score complains about something → for personal use
  you can usually ignore warnings and package anyway; they mostly matter
  for Play Store approval, not for a sideloaded APK.
