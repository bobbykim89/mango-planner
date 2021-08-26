import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

import AuthState from './context/auth/AuthContext';
import AlertState from './context/alert/AlertContext';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <HelmetProvider>
          <Helmet>
            <title>Mango Planner</title>
            <meta
              name='description'
              content='Welcome to Mango Planner! Keep track of your schedule with Mango Planner :D'
            />
          </Helmet>
          <Router>
            <Fragment>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
              </Switch>
            </Fragment>
          </Router>
        </HelmetProvider>
      </AlertState>
    </AuthState>
  );
}

export default App;
