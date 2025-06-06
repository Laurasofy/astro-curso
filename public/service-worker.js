// service-worker.js

const CACHE_NAME = 'pwa-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/sw-register.js',
  '/assets/pwa-192x192.png',
  '/assets/pwa-512x512.png',
  '/favicon.svg',

  '/assets/ACHME-r.png',
  '/assets/ACHME.jpg',
  '/assets/Achme1.png',
  '/assets/ACHMER.png',
  '/assets/ambiente.jpg',
  '/assets/arbol.jpg',
  '/assets/bosque.jpg',
  '/assets/china.png',
  '/assets/Eduardo.png',
  '/assets/energia.jpg',
  '/assets/energiab.jpg',
  '/assets/eolica.jpg',
  '/assets/Gass.jpg',
  '/assets/Grua.jpg',
  '/assets/image-post-01.jpg',
  '/assets/industria.jpg',
  '/assets/infrastructure.jpg',
  '/assets/Instalacion.jpg',
  '/assets/JuanPablo.png',
  '/assets/ls.png',
  '/assets/lss-r.png',
  '/assets/medium.mp4',           // Agregado el video medium.mp4
  '/assets/EnergiaRenovable.mp4', // Agregado el video EnergiaRenovable.mp4
  '/assets/Obra.mp4',             // Agregado el video Obra.mp4
  '/assets/tiny.mp4',             // Agregado el video tiny.mp4
  '/assets/molino.jpg',
  '/assets/Negocios.jpg',
  '/assets/Orlando.png',
  '/assets/panelS.jpg',
  '/assets/pipeline.jpg',
  '/assets/planta.jpg',
  '/assets/planta1.jpg',
  '/assets/rule.png',
  '/assets/Santiago.png',
  '/assets/solar-8656654_640.jpg',
  '/assets/Soluciones.jpg',
  '/assets/ssl.png',
  '/assets/ssl1.png',
  '/assets/trabajador.jpg',
  '/assets/tuberias.jpg',
  '/assets/tuberias1.jpg',
  '/assets/tunel.jpg',
  '/assets/turbinas.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    }).catch((error) => {
      console.error('Falló la caché de instalación:', error);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si hay una respuesta en caché, la devuelve
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si la respuesta no está en caché, intenta hacer la solicitud
      return fetch(event.request).catch((error) => {
        // Si la solicitud falla y es una navegación, muestra la página principal
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }

        // Si la solicitud es un recurso que no está en caché y no hay conexión, devuelve un error
        if (event.request.url.endsWith('.mp4')) {
          // Puedes devolver una imagen de placeholder o un mensaje personalizado
          return new Response('No se pudo recuperar el video, por favor verifica tu conexión a Internet.', { status: 404 });
        }

        // Si la solicitud falla y no es una navegación ni un video, devuelve un error genérico
        return new Response('No se pudo recuperar el recurso, por favor verifica tu conexión a Internet.', { status: 404 });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
