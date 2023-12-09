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
                <img src={blogdata.images[0]} alt="Titelbild" style={{width: '100px'}} />
                <span>{blogdata.date.toDateString()} von Maris</span>
                <h1>{blogdata.title}</h1>
                <p>
                    {blogdata.content}
                </p>
                <Button type='primary'>{t('more')}</Button>
            </div>
        </>
    )
}
