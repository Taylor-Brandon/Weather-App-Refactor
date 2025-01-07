import React from 'react';

export default function Current({ title, date, weather, temp, humidity, wind, icon }) {
    return (
        <div className='weather-area'>
        <div className="weather-info">
            <h2 className='weather-title'>{title} ({date})</h2>
            <p>Weather: {weather}</p>
            <p>Temperature: {temp}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {wind} m/s</p>
            <p>{icon}</p>
        </div>
        </div>
    );
}
