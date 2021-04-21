declare global {
    interface Window {
        ipc: MainRendererApi
    }
}

export interface MainRendererApi {
    openStoreDataStream: () => void;
    titleBarActions: {
        closeApp(): void,
        maximizeOrRestoreApp(): void,
        minimizeApp(): void
    }
}

export { }