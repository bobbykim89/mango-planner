import React, { Fragment } from 'react';
import useDarkMode from '../../utils/useDarkMode';

const DarkMode = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <Fragment>
      <div
        className='inline-block pt-1 pb-2 lg-pb-1 text-red-500 align-middle text-2xl mx-3 hover:text-white transition ease-in duration-150 dark:text-yellow-400 dark:hover:text-white'
        onClick={() => setTheme(colorTheme)}
      >
        <span className='align middle text-lg font-semibold'>Dark Mode </span>
        {colorTheme === 'light' ? (
          <i className='far fa-lightbulb align-middle' />
        ) : (
          <i className='fas fa-lightbulb align-middle' />
        )}
      </div>
    </Fragment>
  );
};

export default DarkMode;
