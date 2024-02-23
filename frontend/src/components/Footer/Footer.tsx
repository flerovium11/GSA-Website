import {FC, useContext} from 'react'
import {LoginContext} from '../App/App'
import {NavLink} from 'react-router-dom'
import LanguageMenu from '../LanguageMenu'
import './Footer.scss'
import {useTranslation} from 'react-i18next'
import { Skeleton } from 'antd'

interface FooterProps {
    loading?:boolean
}

export const Footer:FC<FooterProps> = ({loading=false}) => {
    const loginInfo = useContext(LoginContext)
    const {t} = useTranslation()

    if (loading) {
        return (
            <footer className='flex items-center p-10 gap-10'>
                <Skeleton avatar active />
                <Skeleton active />
                <Skeleton active />
            </footer>
        )
    }

    return (
        <>
            <footer>
                <nav>
                <NavLink to='/'><img src='/graphics/logo_simplified.png' alt='GSA Logo' /></NavLink>
                    <ul>
                        <li><NavLink to='/privacy'>{t('privacy')}</NavLink></li>
                        <li><NavLink to='/imprint'>{t('imprint')}</NavLink></li>
                        <li><a href='#'>{t('to-top')}</a></li>
                    </ul>
                </nav>
                <br />  
                <p>
                    {t('contact')}: <a href={`mailto:gmundenspaceagency@gmail.com?subject=${t('request-over-website')}`}>gmundenspaceagency@gmail.com</a>
                </p>
                <p>Instagram:
                    <a href='https://www.instagram.com/gmundenspaceagency'>gmundenspaceagency</a>
                </p>
                <LanguageMenu />
                <p>
                    {/* "GSA" ist der Link zum Admin Login, wenn dir eine bessere Position für 
                    den Link einfällt, dann ja bitte, ich hab den einfach irgendwohin gepackt */}
                    &copy; 2023 <NavLink to={loginInfo === null ? '/login' : '/admin'}>GSA</NavLink>
                </p>
            </footer>
        </>
    )
}
