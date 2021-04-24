import { StoreName } from "@gnarus-g/store-bought/interface";
import StoreStream, { STORESTREAM_EVENTS } from "@gnarus-g/store-bought/store/StoreStream";
import { MessagePortMain } from "electron/main";
import { streamEventFor } from "../../renderer/utils";

export {
    streamEventFor
}

export function stockFoundEventFor(storeName: StoreName){
    return STORESTREAM_EVENTS.STOCKFOUND + `-for-${storeName}`;
}

export const enum Events {
    OPEN_STORE_DATA_STREAM = "store-data-stream",
    CLOSE_APP = "close-app",
    MINIMIZE = "minimize-app",
    MAXIMIZE_OR_RESTORE = "max/restore",
    WINDOW_MAXIMIZED = "win-is-maxed",
    WINDOW_UNMAXIMIZED = "win-is-restored"
}

export class StreamManager {

    portsAndStreams = new Map<string, [MessagePortMain, StoreStream]>();

    constructor() {
    }

    addOne(clientPort: MessagePortMain, stream: StoreStream): string {
        const id = new Date().getTime() + "";
        this.portsAndStreams.set(id, [clientPort, stream]);
        return id;
    }

    closeOne(id: string) {
        const [port, stream] = this.portsAndStreams.get(id) ?? [];
        this.portsAndStreams.delete(id);
        port?.close();
        stream?.close();
    }
}