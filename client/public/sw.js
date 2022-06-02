import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute, Route, setDefaultHandler } from 'workbox-routing'
import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
  NetworkOnly,
} from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { BackgroundSyncPlugin } from 'workbox-background-sync'

clientsClaim()

self.skipWaiting()

cleanupOutdatedCaches()

// Custom Caching routes
const apiRoute = new Route(
  ({ url }) => {
    return url.origin === location.origin && url.pathname.startsWith('/api/')
  },
  new NetworkFirst({
    cacheName: 'api-data',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24, // Max age 1 day
        maxEntries: 20,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

const weatherAppRoute = new Route(
  ({ url }) => {
    return url.origin === 'https://api.openweathermap.org'
  },
  new NetworkFirst({
    cacheName: 'weather-data',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24, // Max age 1 day
        maxEntries: 5,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

const googleIconRoute = new Route(
  ({ url }) => {
    return url.origin === 'https://fonts.googleapis.com'
  },
  new CacheFirst({
    cacheName: 'google-icon',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // Max age 1 year
        maxEntries: 20,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

const faRoute = new Route(
  ({ url }) => {
    return url.origin === 'https://cdnjs.cloudflare.com'
  },
  new CacheFirst({
    cacheName: 'fa-icon',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // Max age 1 year
        maxEntries: 20,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

const imageRoute = new Route(
  ({ request }) => {
    return request.destination === 'image'
  },
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 5, // Max age 5 days
        maxEntries: 20,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

const staticResourcesRoute = new Route(
  ({ request }) => {
    return request.destination === 'script' || request.destination === 'style'
  },
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24, // Max age 1 day
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

setCacheNameDetails({
  prefix: 'mango-planner',
  suffix: '',
  precache: 'precache',
})

precacheAndRoute(self.__WB_MANIFEST)

// Background sync route
registerRoute(
  ({ url }) =>
    url.origin === location.origin && url.pathname.startsWith('/api/plans'),
  new NetworkOnly({
    plugins: [
      new BackgroundSyncPlugin('bg-sync-queue', {
        maxRetentionTime: 24 * 60, // 1 day
      }),
    ],
  }),
  'POST'
)

// Register routes
registerRoute(apiRoute)
registerRoute(weatherAppRoute)
registerRoute(googleIconRoute)
registerRoute(faRoute)
registerRoute(imageRoute)
registerRoute(staticResourcesRoute)

// Set default precache strategy for runtime resources as stale while revalidate
setDefaultHandler(
  new StaleWhileRevalidate({
    cacheName: 'mango-planner-runtime-cache',

    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24, // default runtime cache max age 1 day
        maxEntries: 20,
      }),

      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)
