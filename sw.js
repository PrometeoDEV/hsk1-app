// Service Worker para HSK 学习 - Funcionalidad Offline
// Versión actualizada con todos los módulos
const CACHE_NAME = 'hsk-app-v4';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/styles.css',
    '/app.js',
    '/data.js',
    '/manifest.json',
    '/robots.txt',
    // Módulos escalables HSK1-6
    '/data/hsk-config.js',
    '/modules/dictionary.js',
    '/modules/sentences.js',
    '/modules/speech.js',
    '/modules/vocabulary.js',
    // Módulos adicionales
    '/modules/statistics.js',
    '/modules/listening.js',
    '/modules/reading.js',
    '/modules/radicals.js',
    '/modules/calendar.js',
    '/modules/backup.js',
    '/modules/notifications.js'
];

// Instalación - Cachear archivos esenciales
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación - Limpiar caches antiguos
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando cache antiguo');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - Estrategia Cache First, luego Network
self.addEventListener('fetch', (event) => {
    // Ignorar requests de extensiones de Chrome y otros
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si está en cache, devolver desde cache
                if (cachedResponse) {
                    // Actualizar cache en background
                    fetch(event.request).then((response) => {
                        if (response && response.status === 200) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, response);
                            });
                        }
                    }).catch(() => {});
                    return cachedResponse;
                }

                // Si no está en cache, buscar en network
                return fetch(event.request)
                    .then((response) => {
                        // Cachear la respuesta para futuro uso offline
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    })
                    .catch(() => {
                        // Si falla y es una página HTML, mostrar página offline dedicada
                        if (event.request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Sincronización en background cuando vuelva la conexión
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        console.log('Service Worker: Sincronizando progreso...');
    }
});

// Notificaciones push (para recordatorios de estudio)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : '¡Es hora de estudiar chino!',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e53935" width="100" height="100" rx="20"/><text x="50" y="65" text-anchor="middle" fill="white" font-size="50">中</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e53935" width="100" height="100" rx="20"/><text x="50" y="65" text-anchor="middle" fill="white" font-size="50">中</text></svg>',
        vibrate: [200, 100, 200],
        tag: 'hsk1-reminder',
        renotify: true,
        actions: [
            { action: 'study', title: '📚 Estudiar ahora' },
            { action: 'later', title: '⏰ Más tarde' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('HSK1 学习', options)
    );
});

// Manejar clic en notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'study' || !event.action) {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
