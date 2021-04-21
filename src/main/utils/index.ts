import StoreStream from "@gnarus-g/store-bought/store/StoreStream";
import { MessagePortMain } from "electron/main";

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