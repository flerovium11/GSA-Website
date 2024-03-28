import {FC, useEffect, useState} from 'react'
import Blogpost from '../../components/Blogpost'
import './BlogOverview.scss'
import { useTranslation } from 'react-i18next'
import { backendRequest } from '../../utils/backend'
import { Skeleton, Space } from 'antd'
import { Blogdata } from '../../components/Blogpost/Blogpost'

interface BlogOverviewProps {
    blogcount?:number
    sort?:'date'|'views'
    isSite?:boolean
    exclude?:string[]
}

export const BlogOverview:FC<BlogOverviewProps> = (props) => {
    const {blogcount = 10, sort = 'date', isSite=false, exclude=[]} = props
    const {t} = useTranslation()
    const [blogposts, setBlogposts] = useState<'loading'|Blogdata[]|'failed'>('loading')
    const [isLoadingInfo, setIsLoadingInfo] = useState<string>('')

    const updateLoadingInfo = (info:string) => {
        setIsLoadingInfo((prev) => prev === '' ? '' : info)
    }
    
    useEffect(() => {
        setIsLoadingInfo('Posts werden geladen...')

        setTimeout(() => updateLoadingInfo('Nicht mehr lange...'), 1000)
        setTimeout(() => updateLoadingInfo('Hmm, das dauert laenger als erwartet...'), 2000)

        backendRequest('php/get_posts.php', {}, null, false).then((response) => {
            setIsLoadingInfo('')
            const posts = JSON.parse(response.text)
            const sorted = posts.sort((a:any, b:any) => sort === 'views' ? (Number(a.views) < Number(b.views) ? 1 : -1) : (Date.parse(a.post_date) > Date.parse(a.post_date) ? 1 : -1))
            const filtered = sorted.filter((post:any) => !exclude.includes(post.string_id))
            setBlogposts(filtered.splice(0, blogcount))
        }).catch((error) => {
            setIsLoadingInfo('')
            setBlogposts('failed')
        })
    }, [props])

    return (
        <main className={isSite ? 'blog-container nopad' : 'blog-container nopad nobg'} style={isSite ? {marginTop: '100px'} : undefined}>
            {(blogposts !== 'loading' && blogposts !== 'failed') && <>
                <div className='blogs'>
                    {blogposts.map((item, index) => {
                        return <Blogpost key={index} blogdata={{
                            string_id: item.string_id,
                            post_date: new Date(item.post_date),
                            admin_name: item.admin_name,
                            content: item.content,
                            title_image: item.title_image,
                            description: item.description,
                            views: Number(item.views)
                        }}/>
                    })}
                    {blogposts.length === 0 &&
                        <h2 className='m-5 sad'>Es gibt keine Posts 😡</h2>
                    }
                </div>
            </>}
            {blogposts === 'loading' && <div className='px-24 w-full'>
                <h2 className='pt-0 mb-5 m-5'>{isLoadingInfo}</h2>
                <Skeleton active />
            </div>}
            {blogposts === 'failed' && <h2 className='m-5 sad'>Tut uns leid, da hat etwas nicht geklappt 😢</h2>}

        </main>
    )
}
