import React from 'react';

export default function Current({ title, date, weather, temp, humidity, wind, icon }) {
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    return (
        <div className='weather-area'>
        <div className="weather-info">
            <h2 className='weather-title'>{title} ({date})</h2>
            <img src={iconUrl} alt={weather} />
            <p>Temperature: {temp}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {wind} m/s</p>
        </div>
        </div>
    );
}
