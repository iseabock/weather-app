import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Icon,
    IconButton,
    TextField,
    makeStyles,
} from '@material-ui/core';

const ShareWeather = (props) => {
    const classes = useStyles();
    const inputRef = useRef(null);
    const [shareText, setShareText] = useState('');

    useEffect(() => {
        const copyToClipboard = () => {
            if (shareText) {
                inputRef.current.select();
                document.execCommand('copy');
                inputRef.current.blur();
            }
        };

        copyToClipboard();
    }, [shareText]);

    return (
        <Grid item className={classes.shareWeather}>
            {document.queryCommandSupported('copy') && (
                <Grid>
                    <IconButton
                        variant="contained"
                        type="button"
                        onClick={() => {
                            setShareText(
                                `Check out the weather here! ${window.location.href}`
                            );
                        }}
                    >
                        Share this with others! &nbsp;
                        <Icon className={classes.SearchArrow}>
                            content_copy
                        </Icon>
                    </IconButton>
                </Grid>
            )}
            {shareText && (
                <form>
                    <TextField
                        className={classes.urlInput}
                        variant="outlined"
                        inputRef={inputRef}
                        value={shareText}
                        readOnly
                    />
                </form>
            )}
        </Grid>
    );
};

export default ShareWeather;

const useStyles = makeStyles({
    shareWeather: { color: '#666666', marginTop: 10, width: '100%' },
    urlInput: { width: '100%' },
});
