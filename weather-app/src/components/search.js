import React, { useState } from 'react';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY; 

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();

        if (!searchInput) {
            alert('You have not searched for a city!');
            return;
        }

        localStorage.setItem('Search', JSON.stringify(searchInput));

        const queryString = `./weather-results.html?q=${searchInput}&appid=${apiKey}`;
        window.location.href = queryString;
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
        </div>
    );
}
