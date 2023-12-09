import {FC} from 'react'
import Blogpost from '../../components/Blogpost'
import './BlogOverview.scss'
import { useTranslation } from 'react-i18next'

interface BlogOverviewProps {
    blogcount?:number
    sort?:'date'|'views'
    ascending?:boolean
}

export const BlogOverview:FC<BlogOverviewProps> = (props) => {
    const {blogcount = 10, sort = 'date', ascending = false} = props
    const {t} = useTranslation()
    const blogposts = Array(blogcount).fill(0)

    return (
        <>
            <h2>{t('news')}</h2>
            <div className='blogs'>
                {blogposts.map((item, index) => {
                    return <Blogpost key={index} blogdata={{
                        randomID: '38sdl',
                        title: 'Der Prototyp',
                        date: new Date(),
                        adminID: 100,
                        content: 'Lorem ipsum dolor sit süßemarismaus :DDD',
                        images: ['https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg']
                    }}/>
                })}
            </div>
        </>
    )
}
