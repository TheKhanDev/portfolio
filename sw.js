/* ============================================================
   sw.js — Service Worker for Waqas Khan Portfolio PWA
   Enables offline access & fast repeat visits
   ============================================================ */

const CACHE_VERSION = 'wk-portfolio-v1';
const ASSETS = [
  './',
  './index.html',
  './CV.html',
  './manifest.json',
  './css/variables.css',
  './css/style.css',
  './css/responsive.css',
  './css/cv.css',
  './js/data.js',
  './js/effects.js',
  './js/main.js',
  './js/cvdata.js',
  './js/cv.js',
  './js/pwa.js'
];

/* ---------- Install: cache app shell ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS).catch(() => {
        // Silently ignore missing files (e.g., CV.html before creating it)
        return Promise.all(
          ASSETS.map(url => cache.add(url).catch(() => {}))
        );
      }))
      .then(() => self.skipWaiting())
  );
});

/* ---------- Activate: clean old caches ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ---------- Fetch: smart routing ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Don't intercept non-GET (form submissions must pass through)
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Skip cross-origin (fonts, CDN, Formspree) — let browser handle
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML navigation (fresh content online, offline fallback)
  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then(cached =>
            cached || caches.match('./index.html')
          )
        )
    );
    return;
  }

  // Cache-first for static assets (CSS, JS, images)
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req)
        .then(res => {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});

/* ---------- Allow page to trigger immediate update ---------- */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});