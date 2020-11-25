import React, { useEffect, useState } from 'react';
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
import useWeatherAndForcast from '../utils';

const SearchWeather = (props) => {
    const { dataChange } = props;
    const [cityInputValue, setCityInputValue] = useState('');
    const [cityName, setCityName] = useState('');
    // const [unitsChecked, setUnitsChecked] = useState(true);
    const [units, setUnits] = useState('imperial');

    const { isLoading, data, error } = useWeatherAndForcast(cityName, units);

    const classes = useStyles();

    const handleSubmit = async (event) => {
        setCityName(cityInputValue);
        event.preventDefault();
    };

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
                                        variant="h6"
                                        style={{ color: '#2979ff' }}
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
                                        variant="h6"
                                        style={{ color: '#2979ff' }}
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
});

export default SearchWeather;
