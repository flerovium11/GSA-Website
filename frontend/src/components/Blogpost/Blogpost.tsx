import {FC} from 'react'
import './Blogpost.scss'
import Button from '../Button'
import { useTranslation } from 'react-i18next'

interface Blogdata {
    randomID:string
    title:string
    date:Date
    adminID:number
    content:string
    images:string[]
}

interface BlogpostProps {
    blogdata:Blogdata
}

export const Blogpost:FC<BlogpostProps> = (props) => {
    const {blogdata} = props
    const {t} = useTranslation()

    return (
        <>
                <div className='blogpost'>
                    <div className='image_wrapper_blog'>
                        <img src={blogdata.images[0]} className='blog_picture' alt="Titelbild"/>
                    </div>
                    <span className='blogdata'>{blogdata.date.toDateString()} von Maris</span>
                    <h1 className='blogdata_title'>{blogdata.title}</h1>
                    <p className='blogdata_p'>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        {blogdata.content}
                    </p>
                        <Button type='primary'>{t('more')}</Button>
                </div>
        </>
    )
}
