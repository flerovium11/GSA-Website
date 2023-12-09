import {FC, useContext} from 'react'
import {LoginContext} from '../App/App'
import {NavLink} from 'react-router-dom'
import LanguageMenu from '../LanguageMenu'
import './Footer.scss'
import {useTranslation} from 'react-i18next'

export const Footer:FC = () => {
    const loginInfo = useContext(LoginContext)
    const {t} = useTranslation()

    return (
        <>
            <footer>
                <nav>
                    <ul>
                        <li><NavLink to='/'><img src='/graphics/icon-logo.png' alt='GSA Logo' /></NavLink></li>
                        <li><NavLink to='/privacy'>{t('privacy')}</NavLink></li>
                        <li><NavLink to='/imprint'>{t('imprint')}</NavLink></li>
                        <li><a href='#'>{t('to-top')}</a></li>
                    </ul>
                </nav>
                <p>
                    {t('contact')}: <a href={`mailto:gmundenspaceagency@gmail.com?subject=${t('request-over-website')}`}>gmundenspaceagency@gmail.com</a>
                </p>
                <p>
                    {/* "GSA" ist der Link zum Admin Login, wenn dir eine bessere Position für 
                    den Link einfällt, dann ja bitte, ich hab den einfach irgendwohin gepackt */}
                    &copy; 2023 <NavLink to={loginInfo.status === 'success' ? '/admin' : '/login'}>GSA</NavLink>
                </p>
                <LanguageMenu />
            </footer>
        </>
    )
}
