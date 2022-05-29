import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import '@/assets/css/app.css'

import Navbar from '@/components/layout/Navbar'
import Alerts from '@/components/layout/Alerts'
import Footer from '@/components/layout/footer'
import About from '@/pages/About'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'

import AuthState from '@/context/auth/AuthContext'
import AlertState from '@/context/alert/AlertContext'
import PlanState from '@/context/plan/PlanContext'

import SW from '@/components/SW/SW'

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
                <SW />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/signup' element={<Signup />} />
                  <Route exact path='/about' element={<About />} />
                </Routes>
                <Footer />
              </Fragment>
            </Router>
          </HelmetProvider>
        </AlertState>
      </PlanState>
    </AuthState>
  )
}

export default App
