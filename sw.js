const CACHE_NAME = "gestion-match-hand-v2";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

// Activation (nettoyage anciens caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception réseau → offline fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(res => {
        return res;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
