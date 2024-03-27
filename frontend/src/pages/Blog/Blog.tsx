import {FC, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import BlogOverview from '../BlogOverview'
import './Blog.scss'
import { backendRequest } from '../../utils/backend'
import { Skeleton, Tooltip } from 'antd'
import { getCookie, setCookie } from '../../utils/cookies'
import { InfoContext } from '../../components/App/App'

let imgName = Math.random() > 0.5 ? 'woman' : 'man'

export const Blog:FC = () => {
    const blogID = useParams().id
    const setInfo = useContext(InfoContext)

    const [blogpost, setBlogpost] = useState<'loading'|any|'failed'|'not found'>('loading')
    const [reactions, setReactions] = useState<any[]>([])
    const [isLoadingInfo, setIsLoadingInfo] = useState<string>('')
    const [reaction, setReaction] = useState<string>('')
    const [initialReaction, setInitialReaction] = useState<string>('')
    const [settingReaction, setSettingReaction] = useState<boolean>(false)

    const updateLoadingInfo = (info:string) => {
        setIsLoadingInfo((prev) => prev === '' ? '' : info)
    }

    const handleSetReaction = (blogpostID:string, reactionID:string) => {
        if (settingReaction) {
            return setInfo('Hoppla, das war etwas zu schnell', 'warning')
        }

        setSettingReaction(true)

        const values:any = {'blogpost-id': blogpostID}
        if (reaction !== '') values['reaction-del-id'] = reaction
        if (reactionID !== '') values['reaction-add-id'] = reactionID

        backendRequest('php/post_reaction.php', values).then((response) => {
            setCookie('blog-' + blogpostID, reactionID, 365)
            setReaction(reactionID)
            console.log(response)
        }).catch((reason) => {
            setInfo('Connection to server failed, try again later!', 'error')
            console.log(reason)
        }).finally(() => {
            setSettingReaction(false)
        })

    }
    
    useEffect(() => {
        setIsLoadingInfo('Loading blog...')

        setTimeout(() => updateLoadingInfo('Hang on...'), 1000)
        setTimeout(() => updateLoadingInfo('This is taking longer than expected...'), 2000)

        backendRequest('php/get_posts.php', {}).then((response) => {
            const posts = JSON.parse(response.text)
            const post = posts.filter((post:any) => post.string_id === blogID)
            
            if (post.length === 0) return setBlogpost('not found')
            else {
                setIsLoadingInfo('')
                setBlogpost(post[0])

                const cookieVal = getCookie('blog-' + post[0].blogpost_id)
                setReaction(cookieVal)
                setInitialReaction(cookieVal)

                backendRequest('php/get_reactions.php', {id: post[0].blogpost_id}).then((response) => {
                    setReactions(JSON.parse(response.text))
                }).catch((error) => {
                    console.error('Loading post reactions failed')
                })
            }
        }).catch((error) => {
            setIsLoadingInfo('')
            setBlogpost('failed')
        })
    }, [blogID])

    return (
        <main className="blog-container">
            {typeof blogpost !== 'string' && <>
                <div className='content-container'>
                    <div dangerouslySetInnerHTML={{ __html: blogpost.content}} />
                </div>
                <div className="blog-bottom">
                    <div className='author'>
                        <img src={`/graphics/${imgName}.png`} alt="author" />
                        <span>{blogpost.admin_name} am {new Date(blogpost.post_date.replace(/-/g, '/')).toLocaleDateString('en-GB', {day:'2-digit', month:'2-digit', year:'2-digit'}).replace(/\//g, '.')}</span>
                    </div>
                    <div className="reactions">
                        {reactions.map((re) => 
                            <Tooltip key={re.reaction_name} title={re.reaction_name} placement='bottom' >
                                <div className={reaction === re.reaction_id ? "reaction active" : "reaction"} onClick={() => reaction === re.reaction_id ? handleSetReaction(blogpost.blogpost_id, '') : handleSetReaction(blogpost.blogpost_id, re.reaction_id)}>
                                    <span className='old-num'>{re.reaction_id === initialReaction ? Number(re.num) - 1 : Number(re.num)}</span><span className='new-num' style={{"--len": re.num.length}}>{re.reaction_id === initialReaction ? Number(re.num) : Number(re.num) + 1}</span>
                                    <span className='emoji'>{re.reaction_content}</span>
                                </div>
                            </Tooltip>
                        )}
                    </div>
                </div> 
                <div className="page-bottom">
                    <h1 className='more-posts'>Weitere Posts</h1>
                    <BlogOverview blogcount={3} exclude={[blogpost.string_id]}/>
                </div>                 
            </>}

            {blogpost === 'loading' && <div className='px-24 w-full'>
                <h2 className='pt-0 mb-5 mt-36 mt-36 m-5'>{isLoadingInfo}</h2>
                <Skeleton active />
            </div>}
            {blogpost === 'failed' && <h2 className='m-5 sad'>Sorry, loading the blog failed 😢</h2>}
            {blogpost === 'not found' && <h2 className='m-5 sad'>This post does not exist 😭</h2>}
        </main>
    )
}
