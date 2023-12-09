import {FC, PropsWithChildren} from 'react'
import './Button.scss'

interface ButtonProps {
    type:'primary'|'secondary'
}

export const Button:FC<PropsWithChildren<ButtonProps>> = (props) => {
    const {type, children} = props

    return (
        <>
            <button className={`button button-${type}`}>{children}</button>
        </>
    )
}
