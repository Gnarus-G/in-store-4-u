import { StoreName } from "@gnarus-g/store-bought/interface";
import { useEffect, useRef, useState } from "react";
import { streamEventFor } from ".";
import { AlertData, StockAlertsRequest, StockAlertsResponse } from "../../../interface";

interface Handlers {
    onDone(): void
    onOngoing(alertData: AlertData): void
}

export default function useStoreStream(storeName: StoreName, { onDone, onOngoing }: Handlers) {
    const [readable, setReadable] = useState(false)
    const [id, setId] = useState<string>("");

    const portRef = useRef<MessagePort>()

    useEffect(() => {

        const listener = (event: MessageEvent) => {
            if (event.source === window && event.data === streamEventFor(storeName)) {
                const [port] = event.ports;
                port.onmessage = e => handleResponseFromMain(e.data);
                portRef.current = port;
            }
        };

        window.addEventListener("message", listener)

        window.ipc.openStoreDataStream();

        return () => {
            window.removeEventListener("message", listener);
        }

    }, [])

    function stopAlerts() {
        const stopReq: StockAlertsRequest = { type: "stop", alertStreamId: id }
        portRef.current?.postMessage(stopReq);
        onDone();
    }

    function startAlerts(itemNumber: string) {
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