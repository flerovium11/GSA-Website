import {FC} from 'react'
import './Button.scss'

interface ButtonProps {
    prop1:string
}

export const Button:FC<ButtonProps> = (props) => {
    const {prop1} = props

    return (
        <>
            <h3>Button</h3>
        </>
    )
}
