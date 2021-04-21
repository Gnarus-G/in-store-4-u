import React, { useCallback } from 'react'
import StoreAlertsView from './StoreAlertsView'
import useStoreAlerts from './useStoreAlerts'

export default function NeweggAlerts() {
    const { listening, disabled, setItemNumber, storeResponses, toggleListening } = useStoreAlerts("newegg");

    const mapResponses = useCallback(() => (storeResponses.map(({ timeStamp, data: { inStock, productTitle } }) => ({ timeStamp, inStock, productTitle }))), [storeResponses])
    return (
        <StoreAlertsView name="Newegg" active={listening}
            toggleActive={toggleListening}
            disabled={disabled}
            responses={mapResponses()}
            setItemNumber={setItemNumber} />
    )
}
