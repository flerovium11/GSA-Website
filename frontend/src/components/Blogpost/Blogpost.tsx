import {FC} from 'react'
import ':/Blogpost.scss'

interface BlogpostProps {
    prop1:string
}

export const Blogpost:FC<BlogpostProps> = (props) => {
    const {prop1} = props

    return (
        <>
            <h3>Blogpost</h3>
        </>
    )
}
