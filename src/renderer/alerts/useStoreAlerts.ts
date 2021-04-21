import type { AlertData } from "../../../interface";
import { useEffect, useState } from "react";
import useStoreStream from "../utils/useStoreStream";

export default function useStoreAlerts(storeName: "newegg") {

    const [listening, setListening] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [itemNumber, setItemNumber] = useState<string>("");
    const [alerts, setAlerts] = useState<AlertData[]>([])

    const { id, readable, startAlerts, stopAlerts } = useStoreStream({
        onDone: reset,
        onOngoing: ({ data, timeStamp }) => {
            setAlerts(arr => {
                if (arr.length > 5)
                    arr.shift()
                return [...arr, { data: data!, timeStamp: timeStamp! }]
            });
        }
    })

    useEffect(() => {
        setDisabled(readable && !id);
    }, [readable, id])

    useEffect(() => {

        if (listening) {
            setAlerts([]);
            startAlerts(storeName, itemNumber)
        }

        !listening && stopAlerts();

    }, [listening])

    function reset() {
        setListening(false);
        setDisabled(false);
    }

    return {
        listening,
        disabled,
        toggleListening: () => setListening(!listening),
        storeResponses: alerts,
        setItemNumber
    }
}