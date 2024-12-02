import React from 'react';

export default function Current({ title, date, weather, temp, humidity, wind }) {
    return (
        <div className="weather-info">
            <h2>{title}</h2>
            <p>{date && new Date(date).toLocaleString()}</p>
            <p>Weather: {weather}</p>
            <p>Temperature: {temp}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {wind} m/s</p>
        </div>
    );
}
