import { useEffect, useRef, useState } from 'react';

const API_KEY = process.env.REACT_APP_OWM_API_KEY;
const DEFAULT_UNITS = 'imperial';
const DAYS = 5;

const fetchWeather = async (cityName, units) => {
    try {
        // Fetch weather data from openweathermap
        const weatherResponse = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`,
            {
                method: 'GET',
            }
        );

        // Set error if response fails
        if (!weatherResponse.ok) {
            throw new Error(`Request Error: ${weatherResponse.status}`);
        }
        return await weatherResponse.json();
    } catch (error) {
        console.log('error', error);
    }
};

const fetchForcast = async (cityName, units) => {
    try {
        // Fetch forcast data from openweathermap
        const forcastResponse = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&units=${units}&cnt=${DAYS}&appid=${API_KEY}`,
            {
                method: 'GET',
            }
        );

        if (!forcastResponse.ok) {
            throw new Error(`Request Error: ${forcastResponse.status}`);
        }

        return await forcastResponse.json();
    } catch (error) {
        console.log('error', error);
        return error;
    }
};

const useWeatherAndForcast = (cityName, units = DEFAULT_UNITS) => {
    const isFirstRun = useRef(true);
    const [state, setState] = useState({
        isLoading: true,
        error: null,
        data: null,
    });

    useEffect(() => {
        // Do not run this function when component mounts. Wait for user input.
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        // Do not run if cityName empty
        if (cityName === '') {
            return;
        }

        setState({
            isLoading: true,
            data: null,
            error: null,
        });

        const weather = fetchWeather(cityName, units);
        const forcast = fetchForcast(cityName, units);

        Promise.all([weather, forcast]).then((values) => {
            setState({
                isLoading: false,
                data: { weather: values[0], forcast: values[1] },
                error: null,
            });
        });
    }, [cityName, units]);

    return state;
};

export default useWeatherAndForcast;
