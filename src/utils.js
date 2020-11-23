const fetchWeather = async (cityName) => {
    const API_KEY = process.env.REACT_APP_OWM_API_KEY;

    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`Request Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log('error', error);
    }
};

export default fetchWeather;
