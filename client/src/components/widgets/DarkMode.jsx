import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DarkMode = () => {
  const root = window.document.documentElement
  const lightTheme = 'light'
  const darkTheme = 'dark'
  let theme

  if (localStorage) {
    theme = localStorage.getItem('theme')
  }
  if (theme === lightTheme || theme === darkTheme) {
    root.classList.add(theme)
  } else {
    root.classList.add(lightTheme)
  }
  const switchTheme = (e) => {
    if (theme === darkTheme) {
      root.classList.replace(darkTheme, lightTheme)
      localStorage.setItem('theme', 'light')
      theme = lightTheme
    } else {
      root.classList.replace(lightTheme, darkTheme)
      localStorage.setItem('theme', 'dark')
      theme = darkTheme
    }
  }

  return (
    <Fragment>
      <div
        className='flex items-center py-2 text-red-500 align-middle text-2xl ml-6 mr-3 hover:text-white transition ease-in duration-150 cursor-pointer dark:text-yellow-400 dark:hover:text-white'
        onClick={(e) => switchTheme(e)}
      >
        <span className='text-lg font-semibold pr-2'>Dark Mode </span>
        {theme === 'light' ? (
          // <i className='far fa-lightbulb align-middle' />
          <FontAwesomeIcon icon='fa-solid fa-sun' />
        ) : (
          // <i className='fas fa-lightbulb align-middle' />
          <FontAwesomeIcon icon='fa-solid fa-moon' />
        )}
      </div>
    </Fragment>
  )
}

export default DarkMode
