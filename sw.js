self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open("bb-cache").then(cache =>
      cache.match(e.request).then(res =>
        res || fetch(e.request).then(response => {
          cache.put(e.request, response.clone());
          return response;
        })
      )
    )
  );
});
