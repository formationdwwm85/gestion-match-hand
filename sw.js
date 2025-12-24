const BASE="https://formationdwwm85.github.io/gestion-match-hand"
const CACHE_NAME = "coach-app-v4";

const FILES = [
  BASE + "/",
  BASE + "/index.html",
  BASE + "/style.css",
  BASE + "/script.js",
  BASE + "/manifest.json",
  BASE + "/icon-192.png",
  BASE + "/icon-512.png"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});