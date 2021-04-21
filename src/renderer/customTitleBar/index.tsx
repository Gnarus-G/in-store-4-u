import { Box, Button, ButtonGroup, Typography } from '@material-ui/core'
import React from 'react'
import css from "./TitleBar.module.css";
import useTitleBarActions from './useTitleBarActions';
import useTitleBarStyles from './useTitleBarStyles';

export default function TitleBar() {
    const { btnShape, exitBtn, left } = useTitleBarStyles();
    const { isWindowMaxed, closeApp, maximizeOrRestoreApp, minimizeApp } = useTitleBarActions();
    return (
        <Box className={css.titleBar} bgcolor="background.paper" color="text.primary">
            <Box display="flex" alignItems="center" paddingY={.5} clone>
                <Typography align="center" variant="h6">
                    {document.title}
                </Typography>
            </Box>
            <ButtonGroup className={left} size="small" variant="text">
                <Button title="Minimize" className={btnShape} onClick={minimizeApp}>
                    <Typography variant="h5" >&minus;</Typography>
                </Button>
                <Button title={isWindowMaxed ? "Restore" : "Maximize"} className={btnShape} onClick={maximizeOrRestoreApp}>
                    {!isWindowMaxed ?
                        <Typography variant="h5" >&#x25FB;</Typography>
                        : <Typography variant="h5" >&#x2750;</Typography>}
                </Button>
                <Button title="Close" className={`${exitBtn} ${btnShape}`} onClick={closeApp}>
                    <Typography variant="h5" >&times;</Typography>
                </Button>
            </ButtonGroup>
        </Box>
    )
}
