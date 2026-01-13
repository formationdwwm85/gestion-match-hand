const CACHE_NAME = "gestion-match-hand-v1";
const FILES = [
  "/gestion-match-hand/",
  "/gestion-match-hand/index.html",
  "/gestion-match-hand/style.css",
  "/gestion-match-hand/app.js",
  "/gestion-match-hand/manifest.json",
  "/gestion-match-hand/icon-192.png",
  "/gestion-match-hand/icon-512.png"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
  )));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
