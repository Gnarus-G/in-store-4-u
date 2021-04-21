import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            light: red[100],
            main: red[500],
            dark: red[700]
        }
    },
});