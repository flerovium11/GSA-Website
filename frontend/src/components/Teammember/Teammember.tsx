import {FC} from 'react'
import './Teammember.scss'

interface TeammemberProps {
    prop1:string
}

export const Teammember:FC<TeammemberProps> = (props) => {
    const {prop1} = props

    return (
        <>
            <h3>Teammember</h3>
        </>
    )
}
