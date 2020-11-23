import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_OWM_API_KEY;

const useFetchWeather = (query) => {
    const [state, setState] = useState({
        isLoading: true,
        error: null,
        data: null,
    });

    useEffect(() => {
        const fetchWeather = async () => {
            // Set state to loading true before each call for spinner and/or conditional rendering
            setState({
                isLoading: true,
                data: null,
                error: null,
            });

            try {
                // Fetch weather data from openweathermap
                const response = await fetch(
                    `http://api.openweathermap.org/data/2.5/weather?q=${query.cityName}&appid=${API_KEY}`,
                    {
                        method: 'GET',
                    }
                );

                // Set error if response fails
                if (!response.ok) {
                    throw new Error(`Request Error: ${response.status}`);
                }

                // On successful fetch set data to our jhson response object
                setState({
                    isLoading: false,
                    data: await response.json(),
                    error: null,
                });
            } catch (error) {
                setState({
                    isLoading: false,
                    data: null,
                    error: error,
                });
            }
        };

        fetchWeather();
    }, [query]);

    return state;
};

export default useFetchWeather;
