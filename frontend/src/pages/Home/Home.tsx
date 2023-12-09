import {FC} from 'react'
import Button from '../../components/Button'
import BlogOverview from '../BlogOverview'
import {NavLink} from 'react-router-dom'
import './Home.scss'
import {useTranslation} from 'react-i18next'

export const Home:FC = () => {
  const {t} = useTranslation()

  return (
    <>
      <section className='home-top'>
        <div>
          <h1>Cansat 2024</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
          </p>
          <div>
            <Button type='secondary'>{t('the-project')}</Button>
            <Button type='secondary'>Blog</Button>
          </div>
        </div>
        <div className="logo-in-circle"></div>
      </section>
      <section className="home-content">
        <BlogOverview blogcount={2}/>
        <Button type='secondary'>Zum Blog</Button>

        <img src="" alt="Clouds behind" className="clouds-behind" />
        <NavLink to='/project'><h1>{t('the-project')}</h1></NavLink>
        <img src="" alt="Clouds infront" className="clouds-infront" />
      </section>
    </>
  )
}
