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
            <div id='blogpost_wrapper'>
                <div className='blogpost'>
                    <div className='image_wrapper_blog'>
                        <img src={blogdata.images[0]} className='blog_picture' alt="Titelbild" style={{width: '100px'}} />
                    </div>
                    <span className='blogdata'>{blogdata.date.toDateString()} von Maris</span>
                    <h1 className='blogdata_title'>{blogdata.title}</h1>
                    <p>
                        {blogdata.content}
                    </p>
                    <Button type='primary'>{t('more')}</Button>
                </div>
            </div>
        </>
    )
}
