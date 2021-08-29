import React, { Fragment } from 'react';

const DarkMode = () => {
  const root = window.document.documentElement;
  const lightTheme = 'light';
  const darkTheme = 'dark';
  let theme;

  if (localStorage) {
    theme = localStorage.getItem('theme');
  }
  if (theme === lightTheme || theme === darkTheme) {
    root.classList.add(theme);
  } else {
    root.classList.add(lightTheme);
  }
  const switchTheme = (e) => {
    if (theme === darkTheme) {
      root.classList.replace(darkTheme, lightTheme);
      localStorage.setItem('theme', 'light');
      theme = lightTheme;
    } else {
      root.classList.replace(lightTheme, darkTheme);
      localStorage.setItem('theme', 'dark');
      theme = darkTheme;
    }
  };

  return (
    <Fragment>
      <div
        className='inline-block pt-1 pb-2 lg-pb-1 text-red-500 align-middle text-2xl ml-6 mr-3 hover:text-white transition ease-in duration-150 cursor-pointer dark:text-yellow-400 dark:hover:text-white'
        onClick={(e) => switchTheme(e)}
      >
        <span className='align middle text-lg font-semibold'>Dark Mode </span>
        {theme === 'light' ? (
          <i className='far fa-lightbulb align-middle' />
        ) : (
          <i className='fas fa-lightbulb align-middle' />
        )}
      </div>
    </Fragment>
  );
};

export default DarkMode;
