import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        overflowY: "scroll",
        '&::-webkit-scrollBar': {
            width: 6,
            height: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: theme.shape.borderRadius,
            // boxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.divider
        }
    },
}))

export default function useThemedScrollbar() {
    return useStyles().root;
}