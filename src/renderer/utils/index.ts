import { StoreName } from "@gnarus-g/store-bought/interface";

export function streamEventFor(storeName: StoreName){
    return `stream-port-${storeName}`;
}