import { Box, Grid } from '@material-ui/core'
import React from 'react'
import NeweggAlerts from './alerts/NeweggAlerts'

export default function App() {

    return (
        <Box p={3} bgcolor="background.default" height="100vh">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <NeweggAlerts />
                </Grid>
          </Grid>
        </Box>
    )
}
