# Mango Planner v0.1.1 (Deployed)

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
aos\
autoprefixer\
axios\
hamburger-react\
postcss-cli\
react-router-dom\
tailwindcss

## Changes

1. Fixed about page issue where picture look stretched in safari
2. Added feature that automatically put incompleted plans on the top side and completed ones to the bottom side.

## Known Issues

1. Weather App API key issue
2. Changes doesn't apply right away when you edit plans after doing search
