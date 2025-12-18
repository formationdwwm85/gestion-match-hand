const CACHE_NAME = "match-hand-v1";
const ASSETS = [
  "https://formationdwwm85.github.io/gestion-match-hand//",
  "https://formationdwwm85.github.io/gestion-match-hand//index.html",
  "https://formationdwwm85.github.io/gestion-match-hand//style.css",
  "https://formationdwwm85.github.io/gestion-match-hand//script.js",
  "https://formationdwwm85.github.io/gestion-match-hand//manifest.json",
  "https://formationdwwm85.github.io/gestion-match-hand//icon-192.png",
  "https://formationdwwm85.github.io/gestion-match-hand//icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});

