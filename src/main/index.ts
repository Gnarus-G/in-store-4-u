import { getAssetURL } from "electron-snowpack"

import { app, BrowserWindow } from 'electron';

import { join } from 'path';
import startHandlingStoreStreams from "./handlingStoreStreams";
import startHandlingTitleBarActions from "./handlingTitleBarActions";

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 440,
        minHeight: 500,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            devTools: process.env.MODE === 'development',
            preload: join(__dirname, "preload.js")
        },
        icon: join(__dirname, "faveicon.png")
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
    startHandlingTitleBarActions(mainWindow);
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