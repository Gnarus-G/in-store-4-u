import { StoreName, StoreResponseDto } from "@gnarus-g/store-bought/interface";
import { Notification } from "electron";
import open from "open";

export default function notifyWhenStockFound(storeName: StoreName, dto: StoreResponseDto) {
    const note = new Notification({
        title: `Stock Found in ${storeName}\n--- Click to add to cart ---`,
        body: dto.productTitle,
    })
    note.addListener("click", () => open(dto.cartLink))
    note.show();
}