import React, { useContext } from 'react';
import { AlertContext } from '../../context/alert/AlertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div
        key={alert.id}
        className='px-3 py-3 text-white text-center bg-red-500 shadow-md'
      >
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
