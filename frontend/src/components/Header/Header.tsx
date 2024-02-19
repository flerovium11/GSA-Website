import {NavLink} from 'react-router-dom'
import {useContext} from 'react'
import {useTranslation} from 'react-i18next'
import {LoginContext} from '../App/App'

import './Header.scss'

export const Header = () => {
  const loginInfo = useContext(LoginContext)
  const {t} = useTranslation()

  return (
    <header>
      <nav className='nav_header'>
        <input type="checkbox" id="cb-burger-menu" hidden/>
        <label htmlFor="cb-burger-menu" className='burger-menu'>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </label>
        <NavLink to='/'><img src='/graphics/logo_simplified.png' alt='GSA Logo' id="logo_simplified"/></NavLink>
        <ul>
          <li><NavLink to='/project'>{t('the-project')}</NavLink></li>
          <li><NavLink to='/blog'>Blog</NavLink></li>
          <li><NavLink to='/about'>{t('we')}</NavLink></li>
          {loginInfo !== null && <li><NavLink to='/admin'>Admin</NavLink></li>}
        </ul>
      </nav>
    </header>
  )
}
