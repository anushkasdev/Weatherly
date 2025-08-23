import React, { useEffect, useState, useRef } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
const TOASTR_TIMEOUT = 1000;
const weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);
  const allIcons = {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon
  }
  const search = async (city) => {
    if (city === "") {
  toastr.options.timeOut = TOASTR_TIMEOUT;
  toastr.error("City name cannot be empty!");
      return;
    }
  try {
    const appId = import.meta.env.VITE_APP_ID;
    if (!appId) {
      throw new Error("API Key is missing!");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appId}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404" || data.cod === 404) {
  toastr.options.timeOut = TOASTR_TIMEOUT;
  toastr.warning("City not found!");
      return;
    }
    const icon = allIcons[data.weather[0].icon] || clear_icon;
    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon
    })
    if (res.ok) {
      console.log("Weather Data:", data);
    } else {
      console.error("API Error:", data);
    }
  } catch (error) {
  toastr.options.timeOut = TOASTR_TIMEOUT;
  toastr.error("Error while fetching the data");
  console.error("Error while fetching the data", error);
  }
};
const handleSearchClickOnce = ()=>{
  setHasSearchedOnce(true);
  search(inputRef.current.value);
}
  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          placeholder='Search'
          ref={inputRef}
          type="text"
          className="Search"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchClickOnce();
            }
          }}
        />
        <img src={search_icon} alt="Find" onClick={()=>
          handleSearchClickOnce()
        } />
      </div>
      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°
C</p>
<p className='location'>{weatherData.city}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default weather;