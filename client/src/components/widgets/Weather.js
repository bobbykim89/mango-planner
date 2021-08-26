import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [coordinate, setCoordinate] = useState({ lat: '', lon: '' });
  const [data, setData] = useState({
    city: '',
    weather: '',
    temperature: '',
  });
  const { lat, lon } = coordinate;

  const API_KEY = 'b87e6baf25314701a619bc852c84fe30';

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  useEffect(() => {
    getWeather();

    // eslint-disable-next-line
  }, [lat, lon]);

  const getGeoData = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinate({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  };

  const getWeather = async () => {
    getGeoData();
    await fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData({
          city: result !== '' && result.name,
          weather: result !== '' && result.weather[0].icon,
          temperature: result !== '' && result.main.temp,
        });
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const { city, weather, temperature } = data;

  const iconUrl = `http://openweathermap.org/img/wn/${weather}@2x.png`;

  return (
    <section className='grid grid-cols-2 mx-auto items-center'>
      <div className='inline-block align-middle  overflow-hidden w-12 text-center mx-auto'>
        <img
          src={iconUrl}
          alt='weather icon'
          className='object-center object-cover'
        />
      </div>
      <div className='row-span-1 inline-block align-middle text-center'>
        <div className=' text-red-500 text-sm font-semibold '>{city}</div>
        <div className=' text-red-500 text-sm font-semibold '>
          {temperature} &deg;F
        </div>
      </div>
    </section>
  );
};

export default Weather;
