import {FC} from 'react'
import './Project.scss'
import { useTranslation } from 'react-i18next'
import { ExportOutlined } from '@ant-design/icons'

export const Project:FC = () => {
    const {t} = useTranslation()

    return (
        <>
            <section className='project-top'>
                    <img className='squares' src='/graphics/squares.svg'></img>
                    <h1>{t('the-project')}</h1>
                    <h2>{t('what-is-cansat')}</h2>
                    <p>
                    Unsere Herausforderung besteht darin, einen Satelliten (CanSat) in der Größe einer Getränkedose zu konstruieren. Dieser soll mithilfe einer Rakete auf eine Höhe von mindestens 500 Metern befördert und anschließend ausgestoßen werden. Während des Abstiegs zurück zur Erde muss der CanSat zwei definierte Missionen erfolgreich absolvieren.

                    <br /> <br />
                    Die Teilnahme am CanSat-Wettbewerb bietet uns die einzigartige Gelegenheit, sämtliche Phasen eines realen Weltraumprojekts zu durchlaufen. Dies umfasst die Auswahl der Mission, das Design des CanSats, die Integration technischer Komponenten, technische Testläufe sowie den eigentlichen Start des Minisatelliten. Darüber hinaus gehört auch die wissenschaftliche Analyse der gesammelten Daten zu den Aufgaben.
                    </p>
                    <a target="_blank" href="https://ars.electronica.art/esero/de/projects/cansat/">Mehr zum Wettbewerb &nbsp;<ExportOutlined /></a>
                <div className='outlined-rect'></div>
                </section>
            <section className="primary-mission">
                <h1>Erste Mission</h1>
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
                        <p>Erstellen eines Temperaturprofils</p>
                    </div>
                </div>
            </section>
            <section className="secondary-mission">
                <div className='stars_wrapper'></div>
                <div className='box_blue_1'></div>
                <h1>Zweite Mission</h1>
                <div className="cards">
                    <div className="card">
                        <img src="/graphics/solar_panel.svg" alt="Planet" />
                        <p>
                        Unsere Vision ist es, eine Landung auf einem Exoplaneten zu simulieren. Im Fokus steht dabei die Energiegewinnung durch Solarzellen.
                        <br />
                        <br />
                        Unser CanSat besteht im Wesentlichen aus zwei Sektoren. Der Hauptsektor umfasst sämtliche Elemente der Primärmission, während der Nebensektor am unteren Teil des CanSats positioniert ist. Seine Aufgabe ist es, ein Solarpanel so zu positionieren, dass es stets der Sonne zugewandt ist. Hierfür sind im oberen Sektor drei Lichtsensoren eingebaut.
                        
                        </p>
                    </div>
                    {/* <div className="card">
                        <div className="planet-icon"></div>
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clia
                        </p>
                    </div> */}
                </div>
            </section>
        </>
    )
}
