// Serpent service worker — minimal offline shell + runtime caching.
//
// v4 change: index.html/manifest.json (the page itself) now use a
// NETWORK-FIRST strategy instead of cache-first. Previously, once a file
// was cached it stayed cached forever until CACHE below was manually
// bumped — meaning code updates pushed to GitHub Pages silently didn't
// reach the installed PWA/APK until a manual bump + hard refresh. Now the
// page always tries the network first (so a fresh GitHub Pages deploy is
// picked up on the very next open), and only falls back to the cached
// copy if there's no network (offline use still works).
//
// Icons and other static assets stay cache-first since they rarely
// change and there's no benefit re-fetching them every load.
const CACHE = 'serpent-v4';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
];
const NETWORK_FIRST_PATHS = ['/', '/index.html', '/manifest.json'];

function isNetworkFirst(url) {
  const path = new URL(url).pathname;
  return NETWORK_FIRST_PATHS.some(p => path === p || path.endsWith(p));
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  if (isNetworkFirst(e.request.url)) {
    // Network-first: always try to get the latest page; cache it as a
    // fallback for offline use; only use the cache if the network fails.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Everything else (icons, etc.) stays cache-first — rarely changes,
  // no reason to hit the network for it every time.
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return (
        cached ||
        fetch(e.request)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              const clone = res.clone();
              caches.open(CACHE).then((c) => c.put(e.request, clone));
            }
            return res;
          })
          .catch(() => cached)
      );
    })
  );
});
