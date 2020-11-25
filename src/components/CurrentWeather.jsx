import React from 'react';
import {
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    makeStyles,
} from '@material-ui/core';

const CurrentWeather = (props) => {
    const { data } = props;
    const classes = useStyles();

    return (
        <>
            <h3 className={classes.sectionHeader}>Right Now in {data.name}</h3>
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
                                {data.main.temp}
                                <span>&#176;</span>
                            </TableCell>
                            <TableCell align="left">
                                {data.main.feels_like}
                                <span>&#176;</span>
                            </TableCell>
                            <TableCell align="left">
                                {data.main.temp_max}
                                <span>&#176;</span>
                            </TableCell>
                            <TableCell align="left">
                                {data.main.temp_min}
                                <span>&#176;</span>
                            </TableCell>
                            <TableCell align="left">
                                {data.main.humidity}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const useStyles = makeStyles({
    sectionHeader: { color: '#666666' },
    tableHeader: { fontWeight: 'bold' },
});

export default CurrentWeather;
