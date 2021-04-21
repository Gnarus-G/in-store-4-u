import { Events } from "./utils";
import { MainRendererApi } from "../renderer/utils/global";

const { contextBridge, ipcRenderer } = require("electron");

ipcRenderer.on('main-world-port', async (event) => {
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage('main-world-port', '*', event.ports)
})


const ipc: MainRendererApi = {
    openStoreDataStream: () => {
        ipcRenderer.send(Events.OPEN_STORE_DATA_STREAM);
    },
    titleBarActions: {
        closeApp() {
            ipcRenderer.send(Events.CLOSE_APP);
        },
        maximizeOrRestoreApp() {
            ipcRenderer.send(Events.MAXIMIZE_OR_RESTORE);
        },
        minimizeApp() {
            ipcRenderer.send(Events.MINIMIZE);
        },
        onMaximizeOrRestore: (callback) => {
            ipcRenderer.on(Events.WINDOW_MAXIMIZED, () => callback(true))
            ipcRenderer.on(Events.WINDOW_UNMAXIMIZED, () => callback(false))
        }
    }
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipc", ipc);