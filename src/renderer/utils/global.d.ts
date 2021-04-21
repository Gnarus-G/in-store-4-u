import type { IpcRenderer } from "electron";

declare global {
    interface Window {
        fromMain: {
            ipcRenderer: IpcRenderer,
        }
    }
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}