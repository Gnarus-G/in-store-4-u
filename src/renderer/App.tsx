import { StoreName } from '@gnarus-g/store-bought/interface'
import { Box, Grid } from '@material-ui/core'
import React from 'react'
import StoreAlerts from './alerts/StoreAlerts'
import useThemedScrollbar from './utils/useThemedScrollBar'

export default function App() {
    const stores: StoreName[] = ["bestbuy", "newegg"]
    return (
        <Box component="main" className={useThemedScrollbar()} p={3} bgcolor="background.default" height="100vh">
            <Grid container spacing={3}>
                {stores.map((name, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <StoreAlerts storeName={name} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
