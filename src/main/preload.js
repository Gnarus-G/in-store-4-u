const { contextBridge, ipcRenderer } = require("electron");

ipcRenderer.on('main-world-port', async (event) => {
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage('main-world-port', '*', event.ports)
})

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipc", ipcRenderer);

