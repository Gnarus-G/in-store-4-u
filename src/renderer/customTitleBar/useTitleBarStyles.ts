import { makeStyles } from '@material-ui/core';
import { useMemo } from 'react';

export default function useTitleBarStyles() {
    return useMemo(() => makeStyles(theme => ({
        exitBtn: {
            '&:hover': {
                backgroundColor: theme.palette.error.main,
            }
        },
        btnShape: {
            padding: "0 1rem",
            borderRadius: 0
        },
        left: {
            marginLeft: "auto"
        }
    }))(), [])
}