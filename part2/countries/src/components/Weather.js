import React, { useState, useEffect } from "react";

export const Weather = ({ country }) => {
  let [weather, setWeather] = useState(null);

  let capital = country.capital;
  const API = process.env.REACT_APP_API_KEY;
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${API}&units=imperial`;

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (response.status > 299) return;
        else return response.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!weather) return;
  return (
    <>
      <div>temperature {weather.main.temp} Fahrenheit</div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <div>wind {weather.wind.speed} m/s</div>
    </>
  );
};
