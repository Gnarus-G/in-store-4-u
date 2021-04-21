import { BrowserWindow, ipcMain } from "electron";
import { Events } from "./utils";

export default function startHandlingTitleBarActions(window: BrowserWindow) {
    ipcMain.on(Events.CLOSE_APP, () => {
        window.close()
    })

    ipcMain.on(Events.MAXIMIZE_OR_RESTORE, () => {
        window.isMaximized() ? window.restore() : window.maximize()
    })

    ipcMain.on(Events.MINIMIZE, () => {
        window.minimize()
    })
}
