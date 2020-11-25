import React, { useState } from 'react';
import { Container, Grid, fade, makeStyles } from '@material-ui/core';

import SearchWeather from './SearchWeather';
import CurrentWeather from './CurrentWeather';
import ForcastWeather from './ForcastWeather';

import '../App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState();

    const classes = useStyles();

    const handleDataChange = (props) => {
        setIsLoading(props.isLoading);
        setError(props.error);
        setData(props.data);
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
                <SearchWeather dataChange={handleDataChange} />
                {!isLoading && !error && (
                    <>
                        <CurrentWeather data={data.weather} />
                        <ForcastWeather data={data.forcast} />
                    </>
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
});

export default App;
