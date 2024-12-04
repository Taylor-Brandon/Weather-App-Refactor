import React, { useState, useEffect } from 'react';
import Current from './current';
import Future from './future';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;
    const [weatherData, setWeatherData] = useState(null);
    const [futureData, setFutureData] = useState(null);
    const [searchedCities, setSearchedCities] = useState([]);

    useEffect(() => {
        const storedCities = localStorage.getItem('searchHistory');
        if (storedCities) {
            setSearchedCities(JSON.parse(storedCities));
        }
    }, []);

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    const fetchWeatherData = async (city) => {
        try {
            // Fetch current weather
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );

            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weather = await weatherResponse.json();
            setWeatherData({
                title: weather.name,
                date: new Date(weather.dt * 1000).toLocaleString(),
                weather: weather.weather[0].description,
                temp: weather.main.temp,
                humidity: weather.main.humidity,
                wind: weather.wind.speed,
            });

            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );

            if (!forecastResponse.ok) {
                throw new Error('Failed to fetch forecast data');
            }

            const forecast = await forecastResponse.json();
            const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0).map((item) => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                weather: item.weather[0].description,
                temp: item.main.temp,
                humidity: item.main.humidity,
                wind: item.wind.speed,
            }));

            setFutureData(dailyForecast);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again.');
        }
    };

    const handleSearchFormSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput.trim()) {
            alert('You have not searched for a city!');
            return;
        }

        const updatedHistory = [...searchedCities, searchInput];
        setSearchedCities(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

        await fetchWeatherData(searchInput);
    };

    const handleSavedSearch = async (city) => {
        await fetchWeatherData(city);
    };

    return (
        <div>
            <div className="cityForm-area">
                <form className="city-form" onSubmit={handleSearchFormSubmit}>
                    <div className="field">
                        <label className="label">Search City</label>
                        <div className="control">
                            <input
                                className="input"
                                name="city"
                                value={searchInput}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter city name"
                            />
                        </div>
                    </div>
                    <button type="submit" className="button">Search</button>
                </form>
            </div>
            <div className="current">
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
            <ul>
                {searchedCities.map((city, index) => (
                    <li key={index} onClick={() => handleSavedSearch(city)}>
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
}
