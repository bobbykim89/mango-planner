# Mango Planner v0.1.3 (Deployed)

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
uuid

### Frontend Dev Dependencies

autoprefixer\
tailwindcss\
postcss-cli

## Changes

1. Use Vite as bundler for frontend page instead of Webpack.
2. Create vite.config.js file to for bundling configuration.
3. config absolute path to use @/\* instead.
4. Update some line of code to use Vite specific expression.
5. Add component handling register serviceWorker, and it send alert messages based on serviceWorker status.
6. Update manifest.json to handle how it will be displayed on mobile device.

## Known Issues

1. Weather App API key issue

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
