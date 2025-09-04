// Service Worker for offline functionality
const CACHE_NAME = 'potholeai-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Background sync for offline issue reports
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineReports());
  }
});

async function syncOfflineReports() {
  // Sync offline reports when connection is restored
  const offlineReports = await getOfflineReports();
  for (const report of offlineReports) {
    try {
      await fetch('/api/issues', {
        method: 'POST',
        body: JSON.stringify(report),
        headers: { 'Content-Type': 'application/json' }
      });
      await removeOfflineReport(report.id);
    } catch (error) {
      console.error('Failed to sync report:', error);
    }
  }
}
