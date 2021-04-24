import { StoreName } from '@gnarus-g/store-bought/interface';
import { Badge, Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useStockFoundHandler from '../handleFoundStock/useStockFoundHandler'
import { StoreResponseView, StoreResponseViewProps } from './StoreResponseView'
import "./animate-cart.css"
import CartIconButton from '../handleFoundStock/CartIconButton';
import ClipBoardButton from '../handleFoundStock/ClipBoardButton';

interface StoreAlertsProps {
    name: StoreName
    active: boolean
    disabled: boolean
    toggleActive: () => void
    responses: StoreResponseViewProps[]
    setItemNumber: React.Dispatch<React.SetStateAction<string>>
}

export default function StoreAlertsView({ name, disabled, active, toggleActive: setActive, responses, setItemNumber }: StoreAlertsProps) {
    const { found, data, openCartLink, reset } = useStockFoundHandler(name);

    useEffect(() => {
        if (disabled) reset()
    }, [disabled])

    return (
        <Paper component="article">
            <Box style={{ float: "right" }} display="flex" flexDirection="column">
                <CartIconButton disabled={!found} onClick={openCartLink} />
                {found && <ClipBoardButton content={data.cartLink} />}
            </Box>
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