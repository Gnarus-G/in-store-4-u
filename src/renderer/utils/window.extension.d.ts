import type { IpcRenderer } from "electron";

declare global {
    interface Window {
        fromMain: {
            ipcRenderer: IpcRenderer,
        }
    }
}