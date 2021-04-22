import { StoreName } from '@gnarus-g/store-bought/interface';
import React, { useCallback } from 'react'
import StoreAlertsView from './StoreAlertsView'
import useStoreAlerts from './useStoreAlerts'

export default function StoreAlerts({ storeName }: { storeName: StoreName }) {
    const { listening, disabled, setItemNumber, storeResponses, toggleListening } = useStoreAlerts(storeName);

    const mapResponses = useCallback(() => (
        storeResponses.map(({ timeStamp, data: { status, productTitle } }) => ({ timeStamp, status, productTitle }))
    ), [storeResponses])
    return (
        <StoreAlertsView name={storeName} active={listening}
            toggleActive={toggleListening}
            disabled={disabled}
            responses={mapResponses()}
            setItemNumber={setItemNumber} />
    )
}
