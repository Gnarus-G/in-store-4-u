import { StoreName, StoreResponseDto } from "@gnarus-g/store-bought/interface";
import { useEffect, useState } from "react";

export default function useStockFoundHandler(storeName: StoreName) {
    const [data, setData] = useState<StoreResponseDto>(null)

    useEffect(() => window.ipc.whenStockFound(storeName, setData), [])

    return {
        found: !!data,
        data,
        openCartLink: () => {
            window.ipc.open(data.cartLink)
        },
        reset: () => setData(null)
    }
}