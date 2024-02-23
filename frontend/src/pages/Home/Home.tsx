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
          <div className='home-top-wrapper'>
            <h1 className='h1_home'>Cansat 2024</h1>
            <p>
            <b>CanSat ist ein Team-Wettbewerb der ESA</b> <br /> <br />
            Die Aufgabe der Teams besteht darin, einen Satelliten (Sat) in Getränkedosengröße (Can) zu bauen. Dieser wird mit einer Rakete in eine Höhe von mindestens 500 Metern befördert und ausgeworfen. Während des Sinkflugs muss der CanSat bestimmte Missionen erfüllen. 
            <br /> <br />
            Wir sind die <b>Gmunden Space Agency </b>, besuchen das BG/BRG Gmunden und nehmen am CanSat-Wettbewerb 2023/2024 teil.
            </p>
            <NavLink to='/'><img src='/graphics/logo_circle.svg' alt='GSA Logo' id="logo_circle"/></NavLink>

              <NavLink to='project'><Button type='secondary'>{t('the-project')}</Button></NavLink>
              <NavLink to='blog'><Button type='secondary'>Blog</Button></NavLink>
          </div>
              <div className='box_blue'></div>
              <div className='galaxy_wrapper'></div>

        <div className="logo-in-circle"></div>
      </section>
      <section className="home-content">
        <BlogOverview blogcount={2} />
        <div id='blog_button'>
          <NavLink to='blog'><Button type='secondary'>Zum Blog</Button></NavLink>
        </div>

        {/* <img src="/graphics/cloud_3.png" alt="Clouds behind" className="clouds-behind" />
        <NavLink to='/project'><h1>{t('the-project')}</h1></NavLink>
        <img src="/graphics/cloud_2.png" alt="Clouds infront" className="clouds-infront" />
        <img src='/graphics/cloud_1.png' alt='Clouds middle' className='clouds-middle' /> */}
      </section>
    </>
  )
}
