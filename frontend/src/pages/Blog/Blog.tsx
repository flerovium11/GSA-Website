import {FC} from 'react'
import {useParams} from 'react-router-dom'
import './Blog.scss'

export const Blog:FC = () => {
    const {blogID} = useParams()

    return (
        <>
            <h3>Blog</h3>
        </>
    )
}
