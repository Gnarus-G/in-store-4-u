import { ipcMain, MessageChannelMain, MessagePortMain } from "electron";
import { BrowserWindow } from "electron/main";
import { streamEventFor, StreamManager } from "./utils";
import { StockAlertsRequest, StockAlertsResponse } from "../../interface";
import { Events } from "./utils";
import { Writable, WritableOptions } from 'stream'
import getStoreBought from "@gnarus-g/store-bought";
import { ALL_STORES, StoreName } from "@gnarus-g/store-bought/interface";
import notifyWhenStockFound from "./notifyWhenStockFound";

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
    ALL_STORES.forEach(name => listenFor(name, mainWindow))
}

function listenFor(storeName: StoreName, mainWindow: BrowserWindow) {
    ipcMain.on(Events.OPEN_STORE_DATA_STREAM, _event => {

        const { port1, port2 } = new MessageChannelMain()

        // We can also receive messages from the main world of the renderer.
        port2.on("message", async (event: any) => handleRequestFromRenderer(event.data, [port1, port2], mainWindow))

        port2.start()

        // The preload script will receive this IPC message and transfer the port
        // over to the main world.
        mainWindow!.webContents.postMessage(streamEventFor(storeName), null, [port1])
    })
}

async function handleRequestFromRenderer(request: StockAlertsRequest, ports: MessagePortMain[], mainWindow: BrowserWindow) {
    switch (request.type) {
        case "start":
            const { storeName, itemNumber } = request;
            await (await getStoreBought())(storeName, itemNumber, stream => {
                const id = streamManager.addOne(ports[0], stream);
                stream.on("end", () => {
                    ports[1].postMessage({ type: "done", alertStreamId: id } as StockAlertsResponse)
                })
                stream.on("stockfound", arg => {
                    notifyWhenStockFound(storeName, arg)
                    mainWindow.webContents.send(Events.STOCK_FOUND + storeName, arg)
                    mainWindow.show()
                    localStorage.getItem("sdf")
                })
                stream.pipe(new Storewritablestream(ports[1], id))
            });
            break;
        case "stop":
            streamManager.closeOne(request.alertStreamId!);
            break;
    }
}