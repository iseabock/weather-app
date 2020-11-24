import React, { useState } from 'react';
import {
    Container,
    FormGroup,
    Grid,
    Icon,
    IconButton,
    Paper,
    Switch,
    TextField,
    Typography,
    fade,
    makeStyles,
    withStyles,
} from '@material-ui/core';
import useFetchWeather from '../utils';

import '../App.css';

function App() {
    const [cityInputValue, setCityInputValue] = useState('');
    const [cityName, setCityName] = useState('');
    const [unitsChecked, setUnitsChecked] = useState(true);
    const [units, setUnits] = useState('imperial');

    const { isLoading, data, error } = useFetchWeather(cityName, units);

    const classes = useStyles();

    const handleUnitSwitch = () => {
        setUnitsChecked(!unitsChecked);
        setUnits(unitsChecked ? 'metric' : 'imperial');
    };

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
                <FormGroup>
                    <form
                        onSubmit={(event) => {
                            handleSubmit(event);
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <TextField
                                    id="city-search"
                                    className={classes.searchInput}
                                    label="City"
                                    variant="outlined"
                                    onChange={(event) =>
                                        setCityInputValue(event.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                variant="contained"
                                                onClick={() => {
                                                    setCityName(cityInputValue);
                                                }}
                                            >
                                                <Icon
                                                    className={
                                                        classes.SearchArrow
                                                    }
                                                >
                                                    search
                                                </Icon>
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography component="div">
                                    <Grid
                                        component="label"
                                        container
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item>C</Grid>
                                        <Grid item>
                                            <UnitSwitch
                                                checked={unitsChecked}
                                                onChange={() =>
                                                    handleUnitSwitch()
                                                }
                                                name="checked"
                                            />
                                        </Grid>
                                        <Grid item>F</Grid>
                                    </Grid>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </FormGroup>
                {console.log('data', data)}
                {!isLoading && !error && (
                    <Paper className={classes.weatherForcast}>
                        <h3>{data.name}</h3>
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

const UnitSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: '#333333',
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

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
