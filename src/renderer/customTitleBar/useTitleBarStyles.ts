import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
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
}))

export default function useTitleBarStyles() {
    return useStyles();
}