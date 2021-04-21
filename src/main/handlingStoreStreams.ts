import { ipcMain, MessageChannelMain, MessagePortMain } from "electron";
import { BrowserWindow } from "electron/main";
import { StreamManager } from "./utils";
import { StockAlertsRequest, StockAlertsResponse } from "../../interface";
import { Events } from "./utils";
import { Writable, WritableOptions } from 'stream'
import getStoreBought from "@gnarus-g/store-bought";

class Storewritablestream extends Writable {

    constructor(private port: MessagePortMain, private id: string, opts?: WritableOptions) {
        super(opts);
    }

    _write(chunck: string, _encoding: any, callack: () => void) {
        const response: StockAlertsResponse = { alertStreamId: this.id, type: "ongoing", data: JSON.parse(chunck), timeStamp: new Date() }
        this.port.postMessage(response)
        callack();
    }
}

const streamManager = new StreamManager();

export default function startHandlingStoreStreams(mainWindow: BrowserWindow) {

    ipcMain.on(Events.OPEN_STORE_DATA_STREAM, _event => {

        const { port1, port2 } = new MessageChannelMain()

        // We can also receive messages from the main world of the renderer.
        port2.on("message", async (event: any) => {
            console.log('from renderer main world:', event.data)
            handleRequestFromRenderer(event.data, [port1, port2]);
        })

        port2.start()

        // The preload script will receive this IPC message and transfer the port
        // over to the main world.
        mainWindow!.webContents.postMessage('main-world-port', null, [port1])
    })

    async function handleRequestFromRenderer(request: StockAlertsRequest, ports: MessagePortMain[]) {
        console.log(`request`, request)
        switch (request.type) {
            case "start":
                const { storeName, itemNumber } = request;
                await (await getStoreBought())(storeName, itemNumber, stream => {
                    const id = streamManager.addOne(ports[0], stream);
                    stream.on("end", () => {
                        ports[1].postMessage({ type: "done", alertStreamId: id } as StockAlertsResponse)
                    })
                    stream.pipe(new Storewritablestream(ports[1], id))
                });
                break;
            case "stop":
                streamManager.closeOne(request.alertStreamId!);
                break;
        }
    }
}
