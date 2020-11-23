import React, { useState } from 'react';

import useFetchWeather from '../utils';

import '../App.css';

function App() {
    const [query, setQuery] = useState({ cityName: '' });
    const { isLoading, data, error } = useFetchWeather(query);

    return (
        <>
            <h1>Weather</h1>
            <input type="text" id="fname" name="fname" />
            <button
                onClick={() => {
                    setQuery({ cityName: 'petaluma' });
                }}
            >
                get petaluma weather
            </button>
        </>
    );
}

export default App;
