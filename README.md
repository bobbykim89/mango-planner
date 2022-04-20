# Mango Planner v0.1.2 (Deployed)

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

### `Backend Dependencies`

bcryptjs\
dotenv\
express\
express-mongo-sanitize\
express-validator\
helmet\
jsonwebtoken\
concurrently\
nodemon

### `Frontend Dependencies`

fontawesome\
autoprefixer\
axios\
hamburger-react\
postcss-cli\
react-router-dom\
js-cookie\
tailwindcss

## Changes

1. Update the version of dependencies.
2. Update frontend folder structure to make more sense.
3. Use Cookie for authentication instead of using local storage.
4. Minor update of layout and components and its colors.
5. Remove no longer used line of code.
6. Update the way to display plans in main page.
7. Update plan context and auth context and remove no longer used functionalities.
8. Update weather app to use icon files stored locally instead of using online source.

## Known Issues

1. Weather App API key issue
