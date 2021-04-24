import { StoreName, StoreResponseDto } from "@gnarus-g/store-bought/interface";
import type { Options } from "open";

declare global {
    interface Window {
        ipc: MainRendererApi
    }
}

export interface MainRendererApi {
    openStoreDataStream: () => void
    whenStockFound(storeName: StoreName, func: (data: StoreResponseDto) => void): void,
    open(target: string, opt?: Options): void,
    titleBarActions: {
        closeApp(): void,
        maximizeOrRestoreApp(): void,
        minimizeApp(): void,
        onMaximizeOrRestore(callback: (isMaximized: boolean) => void): void
    }
}

export { }