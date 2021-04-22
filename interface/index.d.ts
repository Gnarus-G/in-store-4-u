import { StoreName, StoreResponseDto } from "@gnarus-g/store-bought/interface";

type AlertData = { timeStamp: Date, data: StoreResponseDto };

export interface StockAlertsRequest {
    type: "start" | "stop"
    alertStreamId?: string
    storeName?: StoreName,
    itemNumber?: string
}

export interface StockAlertsResponse extends Partial<AlertData> {
    type: "ongoing" | "done"
    alertStreamId: string
}