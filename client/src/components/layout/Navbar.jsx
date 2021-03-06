import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Weather from '@/components/widgets/Weather'
import DarkMode from '@/components/widgets/DarkMode'

import { AuthContext } from '@/context/auth/AuthContext'
import logo from '@/assets/imgs/logo.png'

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, logout, user } = authContext

  const onLogout = () => {
    logout()
    setNavbarOpen(false)
  }

  const clickHandler = () => {
    setNavbarOpen(false)
    // clearCurrent();
  }

  const authLinks = (
    <Fragment>
      <li className='inline-block text-red-500 align-middle text-lg mx-2 font-semibold dark:text-yellow-400'>
        <span className='lg:pl-4 lg:border-l lg:border-red-500 lg:dark:border-yellow-400'>
          Welcome!{' '}
        </span>
        {user && user.name}
      </li>
      <li className='inline-block text-red-500 align-middle text-xl mx-2 hover:text-white transition ease-in duration-150 dark:text-yellow-400 dark:hover:text-white'>
        <a onClick={onLogout} href='/'>
          <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
          <span className='hidden md:inline ml-2 text-lg font-semibold'>
            Logout
          </span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Link
        to='/login'
        onClick={clickHandler}
        className='inline-block text-red-500 align-middle text-xl mx-3 hover:text-white transition ease-in duration-150 dark:text-yellow-400 dark:hover:text-white'
      >
        <FontAwesomeIcon
          icon='fa-solid fa-right-to-bracket'
          className='lg:pl-4 lg:border-l lg:border-red-500 lg:dark:border-yellow-400'
        />
        <span className='ml-2 text-lg font-semibold'>Login</span>
      </Link>
      <Link
        to='/signup'
        onClick={clickHandler}
        className='inline-block text-red-500 align-middle text-xl mx-3 hover:text-white transition ease-in duration-150 dark:text-yellow-400 dark:hover:text-white'
      >
        <FontAwesomeIcon icon='fa-solid fa-user-plus' />
        <span className='ml-2 text-lg font-semibold'>Signup</span>
      </Link>
    </Fragment>
  )

  const [navBarOpen, setNavbarOpen] = useState(false)

  return (
    <nav className='w-full top-0 md:sticky flex flex-wrap items-center bg-yellow-300 z-50 shadow-md bg-opacity-80 dark:bg-opacity-95 dark:bg-gray-700'>
      <div className='container flex flex-wrap items-center py-2 align-middle justify-between'>
        <div className='flex flex-shrink-0 mr-6'>
          <Link to='/' onClick={clickHandler}>
            <span className='inline-block text-red-500 text-2xl font-bold pl-6 dark:text-yellow-400'>
              <div className='inline-block w-6 align-middle'>
                <img src={logo} alt='logo' />
              </div>{' '}
              {title}
            </span>
          </Link>
        </div>
        <div className='block lg:hidden'>
          <button
            className='flex items-center px-3 py-2 text-xl font-bold text-red-500 dark:text-yellow-400'
            type='button'
            onClick={() => setNavbarOpen(!navBarOpen)}
          >
            <Hamburger size={23} toggled={navBarOpen} toggle={setNavbarOpen} />
          </button>
        </div>
        <div
          className={
            'flex-grow w-full lg:flex lg:w-auto items-center' +
            (navBarOpen ? ' block' : ' hidden')
          }
        >
          <div className='flex pt-2 lg:pt-0 mx-auto justify-center'>
            <div className='mr-4 inline-block'>
              <Weather />
            </div>
            <div
              className='inline-block'
              onClick={() => setNavbarOpen(!navBarOpen)}
            >
              <DarkMode />
            </div>
          </div>
          {/* Auth Section */}
          <div className='flex flex-wrap pt-3 pb-2 lg:pb-1 lg:pt-1 justify-center'>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
  title: 'Mango Planner',
}

export default Navbar
