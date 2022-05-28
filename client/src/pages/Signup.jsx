import React, { useContext, useState, useEffect, Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { AlertContext } from '@/context/alert/AlertContext'
import { AuthContext } from '@/context/auth/AuthContext'

const Signup = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated, loading } = authContext

  useEffect(() => {
    if (
      error ===
      'Following email address is already in use, Please use different Email'
    ) {
      setAlert(error)
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const [agree, setAgree] = useState(false)

  const { name, email, password, password2 } = user

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const handleCheckBox = () => {
    setAgree(!agree)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields')
    } else if (password !== password2) {
      setAlert('Please check password again')
    } else if (!agree) {
      setAlert('Please click on checkbox')
    } else {
      register({
        name,
        email,
        password,
      })
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Signup: Mango Planner</title>
        <meta
          name='description'
          content='Thank you for signing up at Mango Planner!'
        />
      </Helmet>
      {isAuthenticated && !loading ? (
        <Navigate to='/' />
      ) : (
        <section className='bg-red-50 py-20 min-h-85v dark:bg-gray-600'>
          <div className='container w-11/12 md:w-1/3 bg-yellow-50 mx-auto px-4 md:px-8 py-8 rounded shadow-lg dark:bg-gray-700'>
            <h1 className='mx-auto text-4xl text-red-500 font-bold text-center mb-4 tracking-wider dark:text-white'>
              Signup
            </h1>
            <form onSubmit={onSubmit} className='flex flex-col'>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='text-yellow-600 dark:text-white text-lg font-semibold'
                >
                  User Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  required
                  className='block w-full mt-1 p-2 outline-none bg-yellow-100 dark:bg-gray-500 shadow text-yellow-600 dark:text-white'
                />
              </div>
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
              <div className='mb-4'>
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
                  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                  title='Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters'
                  className='block w-full mt-1 p-2 outline-none bg-yellow-100 dark:bg-gray-500 shadow text-yellow-600 dark:text-white'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='password2'
                  className='text-yellow-600 dark:text-white text-lg font-semibold'
                >
                  Please type password again
                </label>
                <input
                  type='password'
                  id='password2'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  required
                  minLength='6'
                  maxLength='16'
                  className='block w-full mt-1 p-2 outline-none bg-yellow-100 dark:bg-gray-500 shadow text-yellow-600 dark:text-white'
                />
              </div>
              <div className='mb-6'>
                <input
                  type='checkbox'
                  id='agree'
                  name='agree'
                  value={agree}
                  onClick={handleCheckBox}
                  required
                  className='inline-block mx-3 h-6 w-6 align-middle'
                />
                <label
                  htmlFor='agree'
                  className='text-yellow-600 dark:text-white text-lg font-semibold align-middle'
                >
                  I double checked what I wrote!
                </label>
              </div>
              <input
                type='submit'
                value='Signup'
                className='px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-lg text-white font-semibold tracking-wider shadow-md dark:bg-gray-800 dark:hover:bg-gray-500'
              />
            </form>
          </div>
        </section>
      )}
    </Fragment>
  )
}

export default Signup
