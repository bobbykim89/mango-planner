# Mango Planner v0.1.4 (Deployed)

App Deployed on heroku as [Mango Planner](https://mangoplanner.herokuapp.com/).

## Scripts

In the project directory, you can run:

### `npm start`

Runs the Backend.\
PORT 5000 assigned [http://localhost:5000](http://localhost:5000)

### `npm run server`

runs backend using nodemon, any update on backend will be automatically applied.\

### `npm run dev`

Runs frontend and backend concurrently on localhost.\

App can be found in [http://localhost:3000](http://localhost:3000) for more information.

## Dependencies

### Backend Dependencies

bcryptjs\
express\
express-mongo-sanitize\
express-validator\
helmet\
jsonwebtoken

### Backend Dev Dependencies

dotenv\
concurrently\
nodemon

### Frontend Dependencies

vite\
@vitejs/plugin-react\
vite-plugin-pwa\
axios\
hamburger-react\
react-router-dom\
js-cookie\
uuid\
workbox-background-sync\
workbox-cacheable-response\
workbox-core\
workbox-expiration\
workbox-precaching\
workbox-routing\
workbox-strategies\
@fortawesome/fontawesome-svg-core\
@fortawesome/free-brands-svg-icons\
@fortawesome/free-solid-svg-icons

### Frontend Dev Dependencies

autoprefixer\
tailwindcss\
postcss-cli

## Changes

1. Update Workbox strategy from GenerateSW to InjectManifest method.
2. Remove manifest.json file and moved manifest data inside vite.config.js file
3. Config caching route to have category based on type of cached data:
   - api-data: runtime caching for data from backend API
   - weather-data: runtime caching for data retrieved from weather app
   - google-icon: runtime caching for google material icons
   - fa-icon: runtime caching for fontawesome icons
   - image: runtime caching for data marked as images
   - static-resources: runtime caching for data marked as scripts or stylesheets
   - precache: precaching for manifest data and scripts
   - runtime-caching: runtime caching for misc data that doesn't fit above
4. Config Background sync for offline POST requests.
   - bg-sync-queue
5. Update Weather APP API key issue.
6. Remove FontAwesome and Material icons CDN, and add fontawesome package. Update service worker accordingly.

## Known Issues

1. Workbox PWA is having issue with helmet.js CSP. Since there is only small traffic of users, discarded CSP for now. Still need to figure out how to put CSP guards back on.

## Change Log

### v0.1.0

1. Initial release

### v0.1.1

1. Fix about page issue where picture look stretched in safari
2. Add feature that automatically put incomplete plans on the top side and completed ones to the bottom side.

### v0.1.2

1. Update the version of dependencies.
2. Update frontend folder structure to make more sense.
3. Use Cookie for authentication instead of using local storage.
4. Minor update of layout and components and its colors.
5. Remove no longer used line of code.
6. Update the way to display plans in main page.
7. Update plan context and auth context and remove no longer used functionalities.
8. Update weather app to use icon files stored locally instead of using online source.

### v0.1.3

1. Use Vite as bundler for frontend page instead of Webpack.
2. Create vite.config.js file to for bundling configuration.
3. config absolute path to use @/\* instead.
4. Update some line of code to use Vite specific expression.
5. Add component handling register serviceWorker, and it send alert messages based on serviceWorker status.
6. Update manifest.json to handle how it will be displayed on mobile device.
