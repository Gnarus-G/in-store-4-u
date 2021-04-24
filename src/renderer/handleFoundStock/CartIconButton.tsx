import { Badge, IconButton, IconButtonProps } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

interface CartIconButtonProps {
    disabled: boolean,
    onClick: () => void;
}

export default function CartIconButton({ disabled, onClick, ...rest }: CartIconButtonProps & IconButtonProps) {
    const [anim, setAnim] = useState(!disabled)

    useEffect(() => {
        setAnim(!disabled);
    }, [disabled])

    function handle() {
        onClick()
        setAnim(false)
    }
    return (
        <Badge style={rest.style} badgeContent={Number(anim)} variant="dot" color="secondary">
            <IconButton className={anim && "cart-btn"} title="Add to cart" size="small" color="default" disabled={disabled} onClick={handle} {...rest}>🛒</IconButton>
        </Badge>
    )
}
