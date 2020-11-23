import React, { useState } from 'react';
import {
    Container,
    Grid,
    Icon,
    IconButton,
    Paper,
    TextField,
    fade,
    makeStyles,
} from '@material-ui/core';
import useFetchWeather from '../utils';

import '../App.css';

function App() {
    const [cityInputValue, setCityInputValue] = useState('');
    const [cityName, setCityName] = useState('');
    const { isLoading, data, error } = useFetchWeather(cityName);

    const classes = useStyles();

    const handleSubmit = (event) => {
        setCityName(cityInputValue);
        event.preventDefault();
    };

    return (
        <Container maxWidth="sm">
            <h1>Weather</h1>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <form
                            onSubmit={(event) => {
                                handleSubmit(event);
                            }}
                        >
                            <TextField
                                id="city-search"
                                className={classes.searchInput}
                                label="City"
                                variant="outlined"
                                onChange={(event) =>
                                    setCityInputValue(event.target.value)
                                }
                            />
                            <IconButton
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    setCityName(cityInputValue);
                                }}
                            >
                                <Icon className={classes.searchArrow}>
                                    arrow_forward_ios
                                </Icon>
                            </IconButton>
                        </form>
                    </Grid>
                </Grid>
                {!isLoading && !error && (
                    <Paper className={classes.weatherForcast}>
                        <h3>{cityName.toUpperCase()}</h3>
                        <ul>
                            <li>Temp: {data.main.temp}</li>
                            <li>Feels Like: {data.main.feels_like}</li>
                            <li>Humidity: {data.main.humidity}</li>
                            <li>High: {data.main.temp_max}</li>
                            <li>Low: {data.main.temp_min}</li>
                        </ul>
                    </Paper>
                )}
            </Grid>
        </Container>
    );
}

const useStyles = makeStyles({
    container: {
        border: '1px solid #333',
        borderRadius: 5,
        padding: 20,
        marginTop: 30,
        background: fade('#FFFFFF', 0.8),
    },
    searchInput: {
        background: '#FFFFFF',
    },
    searchArrow: {
        margin: '3px 0 0 0',
    },
    weatherForcast: {
        margin: '10px 0 0 0',
        width: '100%',
        background: fade('#FFFFFF', 0.5),
    },
});

export default App;
