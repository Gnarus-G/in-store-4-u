import { StoreName } from "@gnarus-g/store-bought/interface";
import { useEffect, useRef, useState } from "react";
import { Events } from ".";
import { AlertData, StockAlertsRequest, StockAlertsResponse } from "../../../interface";

interface Handlers {
    onDone(): void
    onOngoing(alertData: AlertData): void
}

export default function useStoreStream({ onDone, onOngoing }: Handlers) {
    const [readable, setReadable] = useState(false)
    const [id, setId] = useState<string>("");

    const portRef = useRef<MessagePort>()

    useEffect(() => {

        window.onmessage = (event: MessageEvent) => {

            if (event.source === window && event.data === 'main-world-port') {
                const [port] = event.ports;

                port.onmessage = e => {
                    console.log(`e.data`, e.data);
                    handleResponseFromMain(e.data);
                }

                portRef.current = port;
            }
        }

        window.ipc.send(Events.OPEN_STORE_DATA_STREAM);

    }, [])

    function stopAlerts() {
        const stopReq: StockAlertsRequest = { type: "stop", alertStreamId: id }
        portRef.current?.postMessage(stopReq);
        onDone();
    }

    function startAlerts(storeName: StoreName, itemNumber: string) {
        if (!portRef.current) return
        setId("");
        setReadable(true)
        const req: StockAlertsRequest = { type: "start", storeName, itemNumber }
        portRef.current?.postMessage(req);
    }

    function handleResponseFromMain(response: StockAlertsResponse) {
        setId(response.alertStreamId)
        switch (response.type) {
            case "done":
                onDone()
                break
            case "ongoing":
                onOngoing(response as AlertData)
                break;
        }
    }

    return {
        startAlerts,
        stopAlerts,
        readable,
        id
    }

}