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
    const [hidden, setHidden] = useState(true);


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
    const handleButtonToggle = () => {
        setHidden(false);
    }

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

    const handleDeleteHistory = (name) => {
        let index = searchedCities.indexOf(name);
        if (index !== -1) {
            searchedCities.splice(index, 1);
            localStorage.setItem('searchHistory', JSON.stringify(searchedCities));
            setSearchedCities( [...searchedCities])
        }
    }

    return (
        <div>
            {!formSubmitted ?
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
                    <button onClick={handleButtonToggle} id='toggle-btn'><i className="bi bi-clock-history"></i></button>
                </form>
                </div>
            </div>
            : 







            <div className='submittedForm-area'>
            <div className='cityForm-area'>
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
                    <button onClick={handleButtonToggle} id='toggle-btn'><i className="bi bi-clock-history"></i></button>
                </form>
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
                    />
                ) : (
                    <p></p>
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
                    <p></p>
                )}
            </div>

            {!hidden ?
            <ul className='history-list'>
                {searchedCities.map((city, index) => (
                    <li id='history-item' key={index} onClick={() => handleSavedSearch(city)}>
                        {city}
                        <button id='del-btn' onClick={() => handleDeleteHistory(city)}><i className="bi bi-x"></i></button>
                    </li>
                ))}
            </ul>
            :
            <ul></ul>
                }
        </div>
    );
}
