import React from 'react'
import './weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const weather = () => {
  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" className="Search" />
        <img src={search_icon} alt="" />
      </div>
      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperature">16°
C</p>
<p className='location'>London</p>
      <h1>Weather</h1>
    </div>
  )
}

export default weather;