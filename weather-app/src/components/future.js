import React from 'react';

export default function Future({ title, date, weather, temp, humidity, wind }) {
    return (
        <div className='future'>
        <div className='forecast-area'>
        <div className='forecast-info'>
            <h2 className='future-title'>{title} ({date && new Date(date).toLocaleString()})</h2>
            <p>Weather: {weather}</p>
            <p>Temperature: {temp}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {wind} m/s</p>
        </div>
        </div>
        </div>
    )
}