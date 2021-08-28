import React, { Fragment, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';

const DarkMode = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, toggleDark, isAuthenticated } = authContext;
  const [dark, setDark] = useState({
    name: '',
    email: '',
    darkMode: false,
  });

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleClick = async (e) => {
    setDark({
      ...dark,
      name: user && user.name,
      email: user && user.email,
      darkMode: user && !user.darkMode,
    });
    await toggleDark(dark);
  };

  return (
    <Fragment>
      {isAuthenticated !== null && user ? (
        <div
          className='inline-block pt-2 pb-2 text-red-500 align-middle text-2xl mx-3 hover:text-white transition ease-in duration-150'
          onClick={handleClick}
        >
          {user && user.darkMode ? (
            <i className='fas fa-moon' />
          ) : (
            <i className='fas fa-sun' />
          )}
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default DarkMode;
