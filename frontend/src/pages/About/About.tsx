import {FC} from 'react'
import Button from '../../components/Button'
import {useTranslation} from 'react-i18next'
import './About.scss'

export const About:FC = () => {
    const {t} = useTranslation()

    return (
        <>
            <section className='about'>
                <h1>{t('the-team')}</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
                    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
                    kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
                </p>
                <div className="teammembers">
                    <div className="teammember">
                        <div className="card">
                            <h1>Maxine Mustermann</h1>
                            <div className="icon"></div>
                        </div>
                        <p>
                            Öffentlichkeitsarbeit, Hardware,
                            Sekundärmission
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Maxine Mustermann</h1>
                            <div className="icon"></div>
                        </div>
                        <p>
                            Öffentlichkeitsarbeit, Hardware,
                            Sekundärmission
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Maxine Mustermann</h1>
                            <div className="icon"></div>
                        </div>
                        <p>
                            Öffentlichkeitsarbeit, Hardware,
                            Sekundärmission
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Maxine Mustermann</h1>
                            <div className="icon"></div>
                        </div>
                        <p>
                            Öffentlichkeitsarbeit, Hardware,
                            Sekundärmission
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Maxine Mustermann</h1>
                            <div className="icon"></div>
                        </div>
                        <p>
                            Öffentlichkeitsarbeit, Hardware,
                            Sekundärmission
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Maxine Mustermann</h1>
                            <div className="icon"></div>
                        </div>
                        <p>
                            Öffentlichkeitsarbeit, Hardware,
                            Sekundärmission
                        </p>
                    </div>
                </div>
                <div>
                    <Button type='secondary'>{t('to-blog')}</Button>
                    <Button type='secondary'>{t('the-project')}</Button>
                </div>
            </section>
        </>
    )
}
