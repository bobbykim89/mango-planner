import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { AlertContext } from '@/context/alert/AlertContext'
import { AuthContext } from '@/context/auth/AuthContext'

const Login = () => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated, loading } = authContext

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error)
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please fill in all fields')
    } else {
      login({
        email,
        password,
      })
    }
  }
  return (
    <Fragment>
      <Helmet>
        <title>Login: Mango Planner</title>
        <meta name='description' content='Logging into Mango Planner!' />
      </Helmet>
      {isAuthenticated && !loading ? (
        <Navigate to='/' />
      ) : (
        <section className='bg-red-50 py-20 min-h-85v dark:bg-gray-600'>
          <div className='container w-11/12 md:w-1/3 bg-yellow-50 mx-auto px-4 md:px-8 py-8 rounded shadow-lg dark:bg-gray-700'>
            <h1 className='mx-auto text-4xl text-red-500 font-bold text-center mb-4 tracking-wider dark:text-white'>
              Login
            </h1>
            <form onSubmit={onSubmit} className='flex flex-col'>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='text-yellow-600 dark:text-white text-lg font-semibold'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                  className='block w-full mt-1 p-2 outline-none bg-yellow-100 dark:bg-gray-500 shadow text-yellow-600 dark:text-white'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='password'
                  className='text-yellow-600 dark:text-white text-lg font-semibold'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  required
                  className='block w-full mt-1 p-2 outline-none bg-yellow-100 dark:bg-gray-500 shadow text-yellow-600 dark:text-white'
                />
              </div>
              <input
                type='submit'
                value='Login'
                className='px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-lg text-white font-semibold tracking-wider shadow-md dark:bg-gray-800 dark:hover:bg-gray-500'
              />
            </form>
          </div>
        </section>
      )}
    </Fragment>
  )
}

export default Login
