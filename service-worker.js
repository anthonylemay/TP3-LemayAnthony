const CACHE_NAME = 'static-cache-v3';

const FILES_TO_CACHE = [
    //Scripts
    'node_modules/flowbite/dist/flowbite.min.js',
    'js/script.js',
    'tailwind.config.js',
    //Html Pages
    'offline.html',
    'confirm-subscription.html',
    'index.html',
    'records.html',
    'hacks.html',
    
    //Imgs
    'img/basketball.svg',
    'img/canada.svg',
    'img/capetown.jpg',
    'img/cheap-fares.svg',
    'img/creditcard.svg',
    'img/denpasar.jpg',
    'img/dropdown.svg',
    'img/edit.svg',
    'img/fares.svg',
    'img/fb.svg',
    'img/gallery-1.jpg',
    'img/gallery-2.jpg',
    'img/gallery-3.jpg',
    'img/gallery-4.jpg',
    'img/gallery-5.jpg',
    'img/gallery-6.jpg',
    'img/hacks.svg',
    'img/hat.svg',
    'img/hj-icon.svg',
    'img/ig.svg',
    'img/language.svg',
    'img/lisbon.jpg',
    'img/logo.svg',
    'img/lowestrecords.svg',
    'img/mail.svg',
    'img/mailbox.svg',
    'img/morocco.jpg',
    'img/mumbai.jpg',
    'img/panamacity.jpg',
    'img/paris.jpg',
    'img/perso-1.jpg',
    'img/perso-2.jpg',
    'img/perso-3.jpg',
    'img/perso-4.jpg',
    'img/perso-5.jpg',
    'img/puertovallarta.jpg',
    'img/records.svg',
    'img/sanjose.jpg',
    'img/ticket.svg',
    'img/tokyo.jpg',
    'img/travelhacks.svg',
    'img/vancouver.jpg',
    'img/bonjourhigh.svg'
];

self.addEventListener('install',(evt) =>{
    console.log('[ServiceWorker] Install');
    self.skipWaiting();
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    // Remove previous cached data from disk.
    self.clients.claim();
});


self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    if (evt.request.mode !== 'navigate') {
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
            });
        })
    );
});