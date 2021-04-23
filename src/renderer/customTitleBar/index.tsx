import { Box, Button, ButtonGroup, Typography } from '@material-ui/core'
import React from 'react'
import "./index.css";
import useTitleBarActions from './useTitleBarActions';
import useTitleBarStyles from './useTitleBarStyles';

export default function TitleBar() {
    const { btnShape, exitBtn, left } = useTitleBarStyles();
    const { isWindowMaxed, closeApp, maximizeOrRestoreApp, minimizeApp } = useTitleBarActions();
    return (
        <Box className="titleBar" bgcolor="background.paper" color="text.primary">
            <Box padding={.5} paddingLeft={.5} display="flex" alignItems="center">
                <img src="./faveicon.png" alt={document.title} width="32" height="32" />
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
