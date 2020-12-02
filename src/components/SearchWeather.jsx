import React, { useEffect, useRef, useState } from 'react';
import {
    FormControlLabel,
    FormGroup,
    Grid,
    Icon,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useWeatherAndForcast from '../utils';

const SearchWeather = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const isFirstRun = useRef(true);
    const [cityInputValue, setCityInputValue] = useState('');
    const [cityName, setCityName] = useState('');
    const [units, setUnits] = useState('imperial');
    const { isLoading, data, error } = useWeatherAndForcast(cityName, units);

    const { dataChange } = props;

    const handleSubmit = async (event) => {
        setCityName(cityInputValue);
        event.preventDefault();
    };

    // Set URL to contain cityName
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (cityName) {
            history.push({
                pathname: `/${cityName}`,
            });
        }
    }, [cityName, history]);

    // set cityName if pathname exists for sharing weather
    useEffect(() => {
        let cityNamePath = window.location.pathname.replace(/\//g, '');

        if (cityNamePath.length > 1) {
            setCityName(cityNamePath);
        }
    }, []);

    // When cityName changes trigger another fetch
    useEffect(() => {
        const returnWeatherObject = () => {
            dataChange({ isLoading, data, error });
        };

        returnWeatherObject();
    }, [isLoading, data, error, dataChange]);

    return (
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
                                        type="submit"
                                    >
                                        <Icon className={classes.SearchArrow}>
                                            search
                                        </Icon>
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <RadioGroup
                            aria-label="units"
                            name="units"
                            value={units}
                            onChange={() =>
                                setUnits(
                                    units === 'imperial' ? 'metric' : 'imperial'
                                )
                            }
                        >
                            <FormControlLabel
                                value="imperial"
                                control={<Radio />}
                                label={
                                    <Typography
                                        className={classes.unitLabel}
                                        variant="h6"
                                    >
                                        Fahrenheit
                                    </Typography>
                                }
                            />
                            <FormControlLabel
                                value="metric"
                                control={<Radio />}
                                label={
                                    <Typography
                                        className={classes.unitLabel}
                                        variant="h6"
                                    >
                                        Celsius
                                    </Typography>
                                }
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </form>
        </FormGroup>
    );
};

const useStyles = makeStyles({
    searchInput: {
        background: '#FFFFFF',
    },
    searchArrow: {
        margin: '3px 0 0 0',
    },
    unitLabel: {
        color: '#333333',
    },
});

export default SearchWeather;
