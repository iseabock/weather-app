import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const ErrorComponent = (props) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.error}>
            Sorry, there was an error with you search. Please try again.
        </Grid>
    );
};

export default ErrorComponent;

const useStyles = makeStyles({
    error: { color: '#663333', marginTop: 10, width: '100%' },
});
