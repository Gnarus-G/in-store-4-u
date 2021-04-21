import { Box } from '@material-ui/core'
import React from 'react'
import styles from "./TitleBar.module.css";


export default function TitleBar() {
    return (
        <Box className={styles.bar} bgcolor="background.paper" color="grey.400" height={40}>
            {document.title}
        </Box>
    )
}
