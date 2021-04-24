import { Events, streamEventFor } from "./utils";
import { MainRendererApi } from "../renderer/utils/global";
import { ALL_STORES, StoreName } from "@gnarus-g/store-bought/interface";
import open from "open";

const { contextBridge, ipcRenderer } = require("electron");

function listenFor(storeName: StoreName) {
    const message = streamEventFor(storeName);
    ipcRenderer.on(message, async (event) => {
        window.postMessage(message, '*', event.ports)
    })
}

ALL_STORES.forEach(listenFor)

const ipc: MainRendererApi = {
    openStoreDataStream: () => {
        ipcRenderer.send(Events.OPEN_STORE_DATA_STREAM);
    },
    whenStockFound: (storename, func) => {
        ipcRenderer.on(Events.STOCK_FOUND + storename, (_, arg) => func(arg as any));
    },
    open,
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