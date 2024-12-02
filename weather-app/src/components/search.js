import React, { useState } from 'react';
import Current from './current';
import Future from './future';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;
    const [weatherData, setWeatherData] = useState(null);
    const [futureData, setFutureData] = useState(null);

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput.trim()) {
            alert('You have not searched for a city!');
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();

            
            setWeatherData({
                title: data.name,
                date: new Date(data.dt * 1000).toLocaleString(),
                weather: data.weather[0].description,
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed,
            });

            console.log('Fetched Weather Data:', data);

            const futureResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=metric`
            );
            if (!futureResponse.ok) {
                throw new Error('Failed to fetch forecast data');
            }

            const forecastData = await futureResponse.json();

            const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0).map((item) => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                weather: item.weather[0].description,
                temp: item.main.temp,
                humidity: item.main.humidity,
                wind: item.wind.speed,
            }));

            setFutureData(dailyForecast);
            console.log('Fetched Forecast Data:', dailyForecast);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again.');
        }
    };

    return (
        <div>
            <div className='cityForm-area'>
                <form className='city-form' onSubmit={handleSearchFormSubmit}>
                    <div className='field'>
                        <label className='label'>Search City</label>
                        <div className='control'>
                            <input
                                className='input'
                                name='city'
                                value={searchInput}
                                onChange={handleChange}
                                type='text'
                                placeholder='Enter city name'
                            />
                        </div>
                    </div>
                    <button type='submit' className='button'>Search</button>
                </form>
            </div>
            <div className='current'>
                {weatherData ? (
                    <Current
                        title={weatherData.title}
                        date={weatherData.date}
                        weather={weatherData.weather}
                        temp={weatherData.temp}
                        humidity={weatherData.humidity}
                        wind={weatherData.wind}
                    />
                ) : (
                    <p>Please search for a city to see the weather.</p>
                )}
                {futureData ? (
        futureData.map((day, index) => (
            <Future
                key={index}
                date={day.date}
                weather={day.weather}
                temp={day.temp}
                humidity={day.humidity}
                wind={day.wind}
            />
        ))
    ) : (
        <p>Please search for a city to see the forecast.</p>
    )}
            </div>
        </div>
    );
}

