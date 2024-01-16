import {FC} from 'react'
import './Project.scss'
import { useTranslation } from 'react-i18next'

export const Project:FC = () => {
    const {t} = useTranslation()

    return (
        <>
            <section className='project-top'>
                <div>
                    <div className='box_blue'></div>
                    <div className='galaxy_wrapper'></div>
                    <img className='squares' src='/graphics/squares.svg'></img>
                    <h1>{t('the-project')}</h1>
                    <h2>{t('what-is-cansat')}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita


                        kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </p>
                    <a href="https://ars.electronica.art/esero/de/projects/cansat/">Mehr zum Wettbewerb</a>
                </div>
                <div className='outlined-rect'></div>
                </section>
            <section className="primary-mission">
                <h1>Primary Mission</h1>
                <div className='missions'>
                    <div className="mission">
                        <img src="/graphics/planet.svg" alt="Planet" />
                        <h2>Mission 1</h2>
                        <p>Messung von Temperatur und Luftdruck</p>
                    </div>
                    <div className="mission">
                        <img src="/graphics/rocket.svg" alt="Planet" />
                        <h2>Mission 2</h2>
                        <p>Ermitteln der tatsächlichen Auswurfhöhe und Fallgeschwindigkeit</p>
                    </div>
                    <div className="mission">
                        <img src="/graphics/temperature.svg" alt="Planet" />
                        <h2>Mission 3</h2>
                        <p>Erstellen von Temperaturprofil</p>
                    </div>
                </div>
            </section>
            <section className="secondary-mission">
                <div className='stars_wrapper'></div>
                <div className='box_blue_1'></div>
                <h1>Secondary Mission</h1>
                <div className="cards">
                    <div className="card">
                        <div className="planet-icon"></div>
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clia
                        </p>
                    </div>
                    <div className="card">
                        <div className="planet-icon"></div>
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clia
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
