import { Box, Button, ButtonGroup, makeStyles, Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import styles from "./TitleBar.module.css";

export default function TitleBar() {
    const buttons = useMemo(() => makeStyles(theme => ({
        closeBtn: {
            '&:hover': {
                backgroundColor: theme.palette.error.main,
            }
        },
        shape: {
            padding: "0 1rem",
            borderRadius: 0
        },
        left: {
            marginLeft: "auto"
        }
    }))(), [])

    return (
        <Box className={styles.bar} bgcolor="background.paper" color="text.primary">
            <Box display="flex" alignItems="center" paddingY={.5} clone>
                <Typography align="center" variant="h6">
                    {document.title}
                </Typography>
            </Box>
            <ButtonGroup className={buttons.left} size="small" variant="text">
                <Button className={buttons.shape}>
                    <Typography variant="h5" >&minus;</Typography>
                </Button>
                <Button className={buttons.shape}>
                    <Typography variant="h5" >&#x25FB;</Typography>
                </Button>
                <Button className={`${buttons.closeBtn} ${buttons.shape}`}>
                    <Typography variant="h5" >&times;</Typography>
                </Button>
            </ButtonGroup>
        </Box>
    )
}
