/* Nur App-Dateien werden zwischengespeichert. Inventardaten bleiben lokal in IndexedDB. */
const CACHE = 'hausrat-offline-shell-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(names => Promise.all(names.filter(name => name !== CACHE).map(name => caches.delete(name)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) { const clone=response.clone(); caches.open(CACHE).then(cache=>cache.put(request,clone)); }
      return response;
    }).catch(() => caches.match(request).then(response => response || caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) { const clone=response.clone(); caches.open(CACHE).then(cache=>cache.put(request,clone)); }
      return response;
    })));
  }
});
