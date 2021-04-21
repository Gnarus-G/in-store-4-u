import { Box, Button, ButtonGroup, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'

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
        <Paper>
            <Box padding="30px">
                <Typography variant="h5" align="center">{name} Alerts</Typography>
                <br />
                <Box display="flex">
                    <TextField style={{ flexGrow: 1 }}
                        InputProps={{ style: { borderRadius: "4px 0 0 4px" } }}
                        label="item#"
                        placeholder="e.g 9SIAPHAEAA2818"
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

interface StoreResponseViewProps {
    timeStamp: Date
    productTitle: string
    inStock: boolean
}

function StoreResponseView({ timeStamp, productTitle, inStock }: StoreResponseViewProps) {
    return (
        <Box color={inStock ? "success.light" : "error.light"} display="flex" justifyItems="stretch">
            <Typography variant="overline" color="textSecondary" style={{ minWidth: "96px" }}>[{timeStamp.toLocaleTimeString()}]:</Typography>
            <Typography variant="overline" noWrap color="inherit" style={{ flexGrow: 1 }}>{productTitle}</Typography>
            <Typography variant="body1" color={inStock ? 'inherit' : 'error'} style={{ minWidth: 78 }}>{inStock ? "IN STOCK" : "NO STOCK"}</Typography>
        </Box>
    )
}
