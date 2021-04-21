import type { IpcRenderer } from "electron";

declare global {
    interface Window {
        ipc: IpcRenderer,
    }
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}