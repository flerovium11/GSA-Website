import {FC} from 'react'
import {useParams} from 'react-router-dom'
import BlogOverview from '../BlogOverview'
import './Blog.scss'

export const Blog:FC = () => {
    const {blogID} = useParams()

    return (
        <>
                <h3>Blogtitel</h3>
                <span>20.11.2023 von Maris</span>
                <img src="" alt="Titelbild" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia id doloremque deserunt perferendis praesentium, facilis reiciendis excepturi optio neque. Deserunt non dolorem esse, ipsa optio voluptate ducimus aliquam dolores suscipit.</p>
                <div className="images">
                    <img src="" alt="Bild1" />
                    <img src="" alt="Bild2" />
                </div>
                <h1>Weitere Posts</h1>
                <BlogOverview blogcount={3} />
        </>
    )
}
