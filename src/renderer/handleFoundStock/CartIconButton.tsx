import { Badge, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

interface CartIconButtonProps {
    disabled: boolean,
    style?: React.CSSProperties,
    onClick: () => void;
}

export default function CartIconButton({ disabled, style, onClick }: CartIconButtonProps) {
    const [anim, setAnim] = useState(!disabled)
    
    useEffect(() => {
        setAnim(!disabled);
    }, [disabled])

    function handle() {
        onClick()
        setAnim(false)
    }
    return (
        <Badge style={style} badgeContent={Number(anim)} variant="dot" color="secondary">
            <IconButton className={anim && "cart-btn"} title="Add to cart" size="small" color="default" disabled={disabled} onClick={handle}>🛒</IconButton>
        </Badge>
    )
}
