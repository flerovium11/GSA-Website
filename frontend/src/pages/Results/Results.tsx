import {FC, lazy, useCallback, useContext, useEffect, useState} from 'react'
import './Results.scss'
import { Line } from 'react-chartjs-2';
import {heightData, heightOptions} from './charts/height'
import {accelerationOptions, accelerationData} from './charts/acceleration'
import {luminanceOptions, luminanceData} from './charts/luminance'
import { voltageData, voltageOptions } from './charts/voltage';
// import { temphumData, temphumOptions } from './charts/temphum';
import { Button, Skeleton } from 'antd';
import { DotChartOutlined, DownloadOutlined } from '@ant-design/icons';
import { InfoContext } from '../../components/App/App';

const containerStyle = {
width: '400px',
height: '400px'
};

const center = {
lat: -3.745,
lng: -38.523
};

const download = (url:string):void => {
    const a:HTMLAnchorElement = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() ?? ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

interface chartAttributes {
    data: object
    options: object
}

export const Results:FC = () => {
    const [temphum, setTemphum] = useState<chartAttributes|null>(null)
    const setInfo = useContext(InfoContext)

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('header') as HTMLElement
            const section = document.querySelector('.results') as HTMLElement

            if (!header || !section) return

            if (window.scrollY > section.offsetTop - header.clientHeight) header.classList.add('scrolled')
            else header.classList.remove('scrolled')
        }

        import('./charts/temphum').then((result) => {
            setTemphum({data: result.temphumData, options: result.temphumOptions})
        }).catch((reason) => {
            console.error(reason)
            setInfo('error', 'Fehler beim Laden von Temperatur- und Feuchtigkeitsdaten!')
        })

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <>
            <section className='home-top'>
                <h1 style={{textAlign: 'center'}}>Ergebnisse</h1>
            </section>
            <section className='results'>
                <div className="inner">
                <div className='flex gap-x-12 gap-y-6 flex-wrap'>
                    <Button icon={<DownloadOutlined />} onClick={() => download('/assets/datalog.csv')}>datalog.csv</Button>
                    <Button icon={<DownloadOutlined />} onClick={() => download('/assets/flight-video.mp4')}>flight-video.mp4</Button>
                    <Button icon={<DownloadOutlined />} onClick={() => download('/assets/flight-3d-reconstruction.mp4')}>flight-3d-reconstruction.mp4</Button>
                </div>
                <h2>Seeh<span className='umlaut'>Ö</span>he</h2>
                <p>Kurz nach dem Höhepunkt wird die zweite Ladung zum Auswerfen der Sonden gezündet. Durch die Detonation steigt der Druck um den CanSat explosionsartig und der BME280 rechnet anhand der Druckdaten eine viel zu tiefe Höhe aus. Bei der blauen Linie wurden die tiefen Fehlmessungen entfernt.</p>
                <div className="chart-container">
                    <Line data={heightData} options={heightOptions as any}/>
                </div>
                <h2>Beschleunigung</h2>
                <p></p>
                <div className="chart-container">
                    <Line data={accelerationData} options={accelerationOptions as any}/>
                </div>
                <h2>Temperatur und Luftfeuchtigkeit</h2>
                <p>
                    
                    Die Sonne heizt die Rakete auf und der RaspberryPi wird wärmer, gleichzeitig sinkt die Feuchtigkeit aufgrund von Verdunstung.
                </p>
                <div className="chart-container">
                    {temphum !== null && <Line data={temphum.data as any} options={temphum.options as any}/>}
                    {temphum == null &&
                        <Skeleton.Node active={true}>
                        <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
                        </Skeleton.Node>
                    }
                </div>
                <h2>Helligkeit der Lichtsensoren</h2>
                <p>
                    Der CanSat dreht sich die ganze Zeit um sich selbst, Sensor 2 ist zu weit oben und daher fällt teilweise ein Schatten auf ihn.
                </p>
                <div className="chart-container">
                    <Line data={luminanceData} options={luminanceOptions as any}/>
                </div>
                <h2>Spannung des Solarpanels</h2>
                <p>
                    
                    Der CanSat dreht sich die ganze Zeit um sich selbst, manchmal hat das Solarpanel einen Wackelkontakt.
                </p>
                <div className="chart-container">
                    <Line data={voltageData} options={voltageOptions as any}/>
                </div>
                <h2>Video</h2>
                <p></p>
                <video src="/assets/flight-video.mp4#t=6.8" controls></video>
                <h2>3D Rekonstruktion</h2>
                <p>
                    Anhand von Lichtsensor- und Gyroskopdaten
                </p>
                <video src="/assets/flight-3d-reconstruction.mp4" controls></video>
                <h2>Landepunkt</h2>
                <p>
                    
                    Der CanSat sendet GPS-Daten an die Bodenstation, sobald er gelandet ist. Hier der Landepunkt des Finales 2024: <br />
                    Längengrad: 13.454655 <br />
                    Breitengrad: 48.39886367 <br />
                    Höhe: 310m
                </p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d8099.697873815499!2d13.446371805752525!3d48.401750220008296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDIzJzU1LjkiTiAxM8KwMjcnMTYuOCJF!5e0!3m2!1sen!2sat!4v1712582888158!5m2!1sen!2sat&amp;ll=48.401750,13.446372&amp;z=18&amp;output=embed&amp;t=k" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </>
    )
}
