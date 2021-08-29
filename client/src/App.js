import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Footer from './components/layout/footer';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './utils/PrivateRoute';

import AuthState from './context/auth/AuthContext';
import AlertState from './context/alert/AlertContext';
import PlanState from './context/plan/PlanContext';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <PlanState>
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
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/signup' component={Signup} />
                  <Route exact path='/about' component={About} />
                </Switch>
                <Footer />
              </Fragment>
            </Router>
          </HelmetProvider>
        </AlertState>
      </PlanState>
    </AuthState>
  );
}

export default App;
