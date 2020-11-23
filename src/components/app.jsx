import React, { useState } from 'react';

import useFetchWeather from '../utils';

import '../App.css';

function App() {
    const [cityInputValue, setCityInputValue] = useState('');
    const [cityName, setCityName] = useState('');
    const { isLoading, data, error } = useFetchWeather(cityName);

    return (
        <>
            <h1>Weather</h1>
            <input
                type="text"
                id="city"
                name="city"
                onChange={(event) => setCityInputValue(event.target.value)}
            />
            <button
                onClick={() => {
                    setCityName(cityInputValue);
                }}
            >
                get petaluma weather
            </button>
        </>
    );
}

export default App;
