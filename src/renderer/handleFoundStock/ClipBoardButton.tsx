import { Badge, Box, IconButton, IconButtonProps } from '@material-ui/core'
import React, { useState } from 'react'

interface ClipBoardButtonProps {
    content: string
}

export default function ClipBoardButton({ content, ...props }: ClipBoardButtonProps & Omit<IconButtonProps, "onClick">) {
    const [copied, setCopied] = useState(false)
    return (
        <Badge variant="dot" badgeContent={Number(!copied)} style={props.style} color="primary">
            <IconButton title="Copy cart link" size="small" {...props} onClick={() => {
                navigator.clipboard.writeText(content);
                setCopied(true);
            }}>📋</IconButton>
        </Badge>
    )
}
