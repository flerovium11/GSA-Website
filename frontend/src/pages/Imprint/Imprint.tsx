import {FC} from 'react'
import './Imprint.scss'
import { useTranslation } from 'react-i18next'

export const Imprint:FC = () => {
    const {t} = useTranslation()

    return (
        <main className='imprint'>
            <h1>Impressum</h1>

        <h2>Kontakt</h2>
        <p>Gmunden Space Agency (GSA)</p>
        <p>
        <a href="mailto:gmundenspaceangency@gmail.com">gmundenspaceangency@gmail.com</a> </p>

        <h2>Redaktionell verantwortlich</h2>
        <p>Ennio Binder<br />
        Heckenweg 18<br />
        4813 Altm&uuml;nster</p>
        <br />
        <br />
        <br />
        </main>
    )
}
