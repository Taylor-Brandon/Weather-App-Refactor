import React, {useState} from 'react';
import 'dotenv/config';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [queryString, setQueryString] = useState('');
    const [apiKey, setApiKey] = useState(process.env.API_KEY);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSearchInput({
            ...searchInput,
            [name]: value,
        });
    };

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();

        if (!searchInput) {
            alert('You have not searched for a city!');
            return;
        }

        setQueryString('./weather-results.html?q=' + searchInput + '&appid=' + apiKey);
        window.location.href = '/results';
    }
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
                            />
                        </div>
                    </div>
                    <button type='submit' className='button'>Search</button>
                </form>
            </div>
        </div>
    )
}