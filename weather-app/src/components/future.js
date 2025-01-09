import React from 'react';

export default function Future({ title, date, weather, temp, humidity, wind, icon }) {
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    return (

        <div className='future'>
        <div className='forecast-area'>
        <div className='forecast-info'>
            <h2 className='future-title'>{date && new Date(date).toLocaleString()}</h2>
            <img src={iconUrl} alt={weather}/>
            <p>Temperature: {temp}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {wind} m/s</p>
        </div>
        </div>
        </div>

    )
}