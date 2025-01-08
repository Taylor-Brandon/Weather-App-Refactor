import React, { useState, useEffect } from 'react';
import Current from './current';
import Future from './future';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;
    const [weatherData, setWeatherData] = useState(null);
    const [futureData, setFutureData] = useState(null);
    const [searchedCities, setSearchedCities] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);


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
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
            );

            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weather = await weatherResponse.json();
            const iconImg = weather.weather[0].icon;
            setWeatherData({
                title: weather.name,
                icon: iconImg,
                date: new Date(weather.dt * 1000).toLocaleString(),
                weather: weather.weather[0].description,
                temp: weather.main.temp,
                humidity: weather.main.humidity,
                wind: weather.wind.speed,
            });

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
            );

            if (!forecastResponse.ok) {
                throw new Error('Failed to fetch forecast data');
            }

            const forecast = await forecastResponse.json();
            const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0).map((item) => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                weather: item.weather[0].description,
                icon: item.weather[0].icon,
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
        setFormSubmitted(true);
    
        if (!searchInput.trim()) {
            alert('You have not searched for a city!');
            return;
        }
    
      
        if (!searchedCities.includes(searchInput.trim())) {
            const updatedHistory = [...searchedCities, searchInput.trim()];
            setSearchedCities(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        }
    
        await fetchWeatherData(searchInput.trim());
    };
    
 
    const handleSavedSearch = async (city) => {
        await fetchWeatherData(city);
    };

    return (
        <div>
            {!formSubmitted ?
            <div className='search-component'>
            <div className='landing-area'>
            <div className="cityForm-area">
                <h1 id='search-header'>Search For A City</h1>
                <form className="city-form" onSubmit={handleSearchFormSubmit}>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input has-background-white has-text-black"
                                name="city"
                                value={searchInput}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                    </div>
                    <button id='submit-btn' type="submit" className="button">Search</button>
                </form>
                </div>
            </div>
            </div>
            : 
            <div className='submittedForm-area'>
            <div className='resultForm-area'>
                <h1 id='search-header'>Search For A City:</h1>
                <form className="city-form" onSubmit={handleSearchFormSubmit}>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input has-background-white has-text-black"
                                name="city"
                                value={searchInput}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                    </div>
                    <button id='submit-btn' type="submit" className="button">Search</button>
                </form>
                <div className='list-area'>
            <ul className='history-list'>
                {searchedCities.map((city, index) => (
                    <li id='history-item' key={index} onClick={() => handleSavedSearch(city)}>
                        {city}
                    </li>
                ))}
            </ul>
            </div>
        </div>
                </div>
}
            <div className="current">
                {weatherData ? (
                    <Current
                        title={weatherData.title}
                        date={weatherData.date}
                        weather={weatherData.weather}
                        temp={weatherData.temp}
                        humidity={weatherData.humidity}
                        wind={weatherData.wind}
                        icon={weatherData.icon}
                    />
                ) : (
                    <p></p>
                )}
                </div>
                <div className='future-area'>
                {futureData ? (
                    futureData.map((day, index) => (
                        <Future
                            key={index}
                            date={day.date}
                            weather={day.weather}
                            temp={day.temp}
                            humidity={day.humidity}
                            wind={day.wind}
                            icon={day.icon}
                        />
                    ))
                ) : (
                    <p></p>
                )}
                </div>
</div>
    );
}
