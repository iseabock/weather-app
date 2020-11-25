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

import * as dayjs from 'dayjs';

const ForcastWeather = (props) => {
    const { data } = props;
    const classes = useStyles();

    return (
        <>
            <h3 className={classes.sectionHeader}>Five Day Forcast</h3>
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
                        {data.list.map((row) => (
                            <TableRow key={row.dt}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="left"
                                >
                                    {dayjs.unix(row.dt).format('dddd')}
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
    );
};

export default ForcastWeather;

const useStyles = makeStyles({
    sectionHeader: { color: '#666666' },
    tableHeader: { fontWeight: 'bold' },
});
