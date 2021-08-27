import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex flex-wrap justify-center bottom-0 mx-auto px-6 bg-yellow-200 shadow-inner'>
      <div className='container mt-6 border-t-2 border-red-300 md:w-2/3 items-center'>
        <div className='text-center py-4 flex flex-wrap justify-center'>
          <Link
            to='/about'
            className='text-sm text-red-500 font-bold align-middle mr-4'
          >
            &copy; Mango Planner 2021
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
