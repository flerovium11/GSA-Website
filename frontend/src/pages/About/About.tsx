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
                <p className='introduction'>
                Mit dem klaren Ziel, nicht nur einen funktionsfähigen Satelliten zu bauen, sondern auch den CanSat-Wettbewerb zu gewinnen, starteten wir, die Gmunden Space Agency (GSA), bestehend aus sechs Mitgliedern des Naturwissenschaftlichen Zweigs des BG/BRG Gmunden, im Oktober in die Recherche und Planung. Uns treibt nicht nur das Interesse an einem Luft- und Raumfahrtprojekt, sondern auch der Wunsch, unsere wissenschaftlichen Kompetenzen zu vertiefen, an. Teamarbeit und das Knüpfen von Kontakten stehen für uns im Vordergrund. 
                </p>
                <div className="teammembers">
                    <div className="teammember">
                        <div className="card">
                            <h1>Ennio (17)</h1>
                            <a target='_blank' href='https://www.instagram.com/bin.der.ennio'><img className='instagram' src='/graphics/instagram.svg'></img></a>
                            <div className='fade'></div>
                        </div>
                        <p>
                        Programmieren, Zusammenbau, Signalübertragung
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Robert (17)</h1>
                            <a target='_blank' href='https://www.instagram.com/robrob4000'><img className='instagram' src='/graphics/instagram.svg'></img></a>
                            <div className='fade'></div>
                        </div>
                        <p>
                        Programmieren, Zusammenbau, Bodenstation
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Tanja (16)</h1>
                            <a target='_blank' href='https://www.instagram.com/_tanja.hessenberger_'><img className='instagram' src='/graphics/instagram.svg'></img></a>
                            <div className='fade'></div>
                        </div>
                        <p>
                        Fallschirm, Drehmechanismus    
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Simeon (16)</h1>
                            <a target='_blank' href='https://www.instagram.com/simeon__n'><img className='instagram' src='/graphics/instagram.svg'></img></a>
                            <div className='fade'></div>
                        </div>
                        <p>
                        Programmieren, Zusammenbau, Drehmechanismus
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Amelie (17)</h1>
                            <a target='_blank' href='https://www.instagram.com/schulz010'><img className='instagram' src='/graphics/instagram.svg'></img></a>
                            <div className='fade'></div>
                        </div>
                        <p>
                        Fallschirm, Drehmechanismus, Öffentlichkeitsarbeit
                        </p>
                    </div>
                    <div className="teammember">
                        <div className="card">
                            <h1>Maris (17)</h1>
                            <a target='_blank' href='https://www.instagram.com/mariszellinger'><img className='instagram' src='/graphics/instagram.svg'></img></a>
                            <div className='fade'></div>
                        </div>
                        <p>
                        Fallschirm, 3D Druck, Projektmanagement, Design
                        </p>
                    </div>
                </div>
                <div>
                    {/* <Button type='secondary'>{t('to-blog')}</Button>
                    <Button type='secondary'>{t('the-project')}</Button> */}
                </div>
            </section>
        </>
    )
}
