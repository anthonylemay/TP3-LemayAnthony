const CACHE_NAME = 'static-cache-v1';

const FILES_TO_CACHE= [
    'offline.html',
    'index.html'
];

self.addEventListener('install',(evt) =>{
    console.log('[ServiceWorker] Install');
    //Precache static resources here.
    self.skipWaiting();
    evt.waitUntil(
        caches.opem(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

    self.addEventListener('activate', (evt) => {
        console.log('[ServiceWorker] Activate');
        //Remove previous cached data from disk.
        self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //add fetch event handler here.
});