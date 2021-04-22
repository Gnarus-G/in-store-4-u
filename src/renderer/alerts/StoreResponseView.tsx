import React from "react"
import { Status } from "@gnarus-g/store-bought/interface"
import { Box, Typography } from "@material-ui/core"

export interface StoreResponseViewProps {
    timeStamp: Date
    productTitle: string
    status: Status
}

export function StoreResponseView({ timeStamp, productTitle, status }: StoreResponseViewProps) {
    const timeAndTitle = <>
        <Typography variant="overline" color="textSecondary" style={{ minWidth: "96px" }}>[{timeStamp.toLocaleTimeString()}]:</Typography>
        <Typography variant="overline" noWrap color="inherit" style={{ flexGrow: 1 }}>{productTitle}</Typography>
    </>
    switch (status) {
        case "instock":
            return (<Box color="success.light" display="flex" justifyItems="stretch">
                {timeAndTitle}
                <Box color="success.main">
                    <Typography variant="body1" color="inherit" style={{ minWidth: 78 }}>IN STOCK</Typography>
                </Box>
            </Box>)
        case "nostock":
            return (<Box color="error.light" display="flex" justifyItems="stretch">
                {timeAndTitle}
                <Typography variant="body1" color="error" style={{ minWidth: 78 }}>NO STOCK</Typography>
            </Box>)
        case "undetermined":
        default:
            return (<Box color="warning.light" display="flex" justifyItems="stretch">
                {timeAndTitle}
                <Box color="warning.main">
                    <Typography variant="body1" color="inherit" style={{ minWidth: 78 }} noWrap>UNDETERMINED</Typography>
                </Box>
            </Box>)

    };

}