import React, { useState } from 'react';
import {
    Container,
    FormGroup,
    Grid,
    Icon,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    TableRow,
    Typography,
    fade,
    makeStyles,
    withStyles,
} from '@material-ui/core';
import * as dayjs from 'dayjs';
import useWeatherAndForcast from '../utils';

import '../App.css';

function App() {
    const [cityInputValue, setCityInputValue] = useState('');
    const [cityName, setCityName] = useState('');
    const [unitsChecked, setUnitsChecked] = useState(true);
    const [units, setUnits] = useState('imperial');

    const { isLoading, data, error } = useWeatherAndForcast(cityName, units);

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
                {!isLoading && !error && (
                    <>
                        <h3 className={classes.sectionHeader}>
                            Right Now in {data.weather.name}
                        </h3>
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            className={classes.tableHeader}
                                            align="left"
                                        >
                                            Temp
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeader}
                                            align="left"
                                        >
                                            Feels Like
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeader}
                                            align="left"
                                        >
                                            High of
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeader}
                                            align="left"
                                        >
                                            Low of
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeader}
                                            align="left"
                                        >
                                            Humidity
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">
                                            {data.weather.main.temp}
                                            <span>&#176;</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.weather.main.feels_like}
                                            <span>&#176;</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.weather.main.temp_max}
                                            <span>&#176;</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.weather.main.temp_min}
                                            <span>&#176;</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.weather.main.humidity}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <h3 className={classes.sectionHeader}>
                            Five Day Forcast
                        </h3>
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="left"
                                            className={classes.tableHeader}
                                        >
                                            Day
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={classes.tableHeader}
                                        >
                                            Low
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={classes.tableHeader}
                                        >
                                            High
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={classes.tableHeader}
                                        >
                                            Humidity
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.forcast.list.map((row) => (
                                        <TableRow key={row.dt}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="left"
                                            >
                                                {dayjs
                                                    .unix(row.dt)
                                                    .format('dddd')}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.temp.min}
                                                <span>&#176;</span>
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.temp.max}
                                                <span>&#176;</span>
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.humidity}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
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
    sectionHeader: { color: '#666666' },
    tableHeader: { fontWeight: 'bold' },
    searchArrow: {
        margin: '3px 0 0 0',
    },
    weatherForcast: {
        margin: '10px 0 0 0',
        width: '100%',
    },
});

export default App;
