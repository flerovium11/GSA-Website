import {FC} from 'react'
import './Blogpost.scss'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export interface Blogdata {
    string_id:string
    content:string
    description:string
    title_image:string
    post_date:Date
    admin_name:string
    views:number
}

interface BlogpostProps {
    blogdata:Blogdata
}

export const Blogpost:FC<BlogpostProps> = (props) => {
    const {blogdata} = props
    const {t} = useTranslation()

    const content = document.createElement('div')
    content.innerHTML = blogdata.content
    const title = content.querySelector('h1')?.innerText

    return (
        <>
            <div className='blogpost'>
                <div className='image_wrapper_blog'>
                    <img src={blogdata.title_image} className='blog_picture' alt="Kein Titelbild"/>
                </div>
                <div className="content-wrapper">
                    <span className='blogdata'>{blogdata.post_date.toDateString()} von {blogdata.admin_name}</span>
                    <h1 className='blogdata_title'>{title}</h1>
                    <p className='blogdata_p'>{blogdata.description}</p>
                    <NavLink to={`/blog/${blogdata.string_id}`}><Button type='primary'>{t('more')}</Button></NavLink>
                </div>
            </div>
        </>
    )
}
