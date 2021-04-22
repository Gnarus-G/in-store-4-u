import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { StoreResponseView, StoreResponseViewProps } from './StoreResponseView'

interface StoreAlertsProps {
    name: string
    active: boolean
    disabled: boolean
    toggleActive: () => void
    responses: StoreResponseViewProps[]
    setItemNumber: React.Dispatch<React.SetStateAction<string>>
}

export default function StoreAlertsView({ name, disabled, active, toggleActive: setActive, responses, setItemNumber }: StoreAlertsProps) {
    return (
        <Paper component="article">
            <Box padding="30px">
                <Typography style={{ textTransform: "uppercase" }} variant="h5" align="center">{name} Alerts</Typography>
                <br />
                <Box display="flex">
                    <TextField style={{ flexGrow: 1 }}
                        InputProps={{ style: { borderRadius: "4px 0 0 4px" } }}
                        label="item#"
                        placeholder="or ASIN, or SKU, etc..."
                        fullWidth
                        variant="filled"
                        onChange={e => setItemNumber(e.currentTarget.value)} />
                    <Button variant="contained" style={{ borderRadius: "0 4px 4px 0" }} disabled={disabled} color={active ? "secondary" : "primary"} onClick={setActive}>{active ? "Stop" : "Start"}</Button>
                </Box>
                <br />
                <Box border={1} p={1} borderColor="transparent" borderRadius="borderRadius" minHeight="185px" boxShadow="inset .2rem .15rem rgba(0,0,0,.15)">
                    {responses?.map((res, index) => <StoreResponseView key={index} {...res} />)}
                </Box>
            </Box>
        </Paper>
    )
}