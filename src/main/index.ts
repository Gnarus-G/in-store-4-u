import { getAssetURL } from "electron-snowpack"

import { app, BrowserWindow } from 'electron';

import { join } from 'path';
import startHandlingStoreStreams from "./startHandlingStoreStreams";

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        backgroundColor: '#2e2c29',
        minWidth: 440,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            preload: join(__dirname, "preload.js")
        }
    });

    if (process.env.MODE !== 'production') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(getAssetURL('index.html'));

    mainWindow.on('closed', (): void => {
        mainWindow = null;
    });

    mainWindow.webContents.on('devtools-opened', (): void => {
        mainWindow.focus();
        setImmediate((): void => {
            mainWindow.focus();
        });
    });
}

app.on('ready', () => {
    createWindow()
    startHandlingStoreStreams(mainWindow);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});