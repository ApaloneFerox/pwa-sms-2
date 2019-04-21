//Cache polyfil to support cacheAPI in all browsers
importScripts('./assets/cache-polyfill.js');

var cacheName = 'SAM-iPhone6-sms-2-v1';

//Files to save in cache
var files = [
  './',
  './index.html?utm=homescreen', //SW treats query string as new request
  './assets',
  './assets/img',
  './assets/img/thumb-SCREEN.jpg',
  './assets/img/icon-144.png',
  './assets/img/icon-192.png',
  './assets/img/icon-512.png',
  './assets/img/sms-sam-2319.jpg',
  './assets/img/arraw.gif',
  './assets/img/icon.svg',
  './assets/reset.css',
  './assets/sms-2.css',
  './assets/sms-2.js',
  './assets/manifest.json'
];

//Adding `install` event listener
self.addEventListener('install', (event) => {
  // console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
      .then(() => {
        // console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        // console.error('Failed to cache', error);
      })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', (event) => {
  // console.info('Event: Fetch');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      // // Checking for navigation preload response
      // if (event.preloadResponse) {
      //   console.info('Using navigation preload');
      //   return response;
      // }

      //if request is not cached or navigation preload response, add it to cache
      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              // console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', (event) => {
  // console.info('Event: Activate');

  //Navigation preload is help us make parallel request while service worker is booting up.
  //Enable - chrome://flags/#enable-service-worker-navigation-preload
  //Support - Chrome 57 beta (behing the flag)
  //More info - https://developers.google.com/web/updates/2017/02/navigation-preload#the-problem

  // Check if navigationPreload is supported or not
  // if (self.registration.navigationPreload) {
  //   self.registration.navigationPreload.enable();
  // }
  // else if (!self.registration.navigationPreload) {
  //   console.info('Your browser does not support navigation preload.');
  // }

  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache); //Deleting the old cache (cache v1)
          }
        })
      );
    })
    .then(function () {
      // console.info("Old caches are cleared!");
      // To tell the service worker to activate current one
      // instead of waiting for the old one to finish.
      return self.clients.claim();
    })
  );
});
//Adding `install` event listener
self.addEventListener('install', (event) => {
  // console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
      .then(() => {
        // console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        // console.error('Failed to cache', error);
      })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', (event) => {
  // console.info('Event: Fetch');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      // // Checking for navigation preload response
      // if (event.preloadResponse) {
      //   console.info('Using navigation preload');
      //   return response;
      // }

      //if request is not cached or navigation preload response, add it to cache
      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              // console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', (event) => {
  // console.info('Event: Activate');

  //Navigation preload is help us make parallel request while service worker is booting up.
  //Enable - chrome://flags/#enable-service-worker-navigation-preload
  //Support - Chrome 57 beta (behing the flag)
  //More info - https://developers.google.com/web/updates/2017/02/navigation-preload#the-problem

  // Check if navigationPreload is supported or not
  // if (self.registration.navigationPreload) {
  //   self.registration.navigationPreload.enable();
  // }
  // else if (!self.registration.navigationPreload) {
  //   console.info('Your browser does not support navigation preload.');
  // }

  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache); //Deleting the old cache (cache v1)
          }
        })
      );
    })
    .then(function () {
      // console.info("Old caches are cleared!");
      // To tell the service worker to activate current one
      // instead of waiting for the old one to finish.
      return self.clients.claim();
    })
  );
});
