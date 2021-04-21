import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TitleBar from './customTitleBar';
import { darkTheme } from "./darkTheme"
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <TitleBar />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept();
}