import {NavLink} from 'react-router-dom'
import {useContext, FC} from 'react'
import {useTranslation} from 'react-i18next'
import {LoginContext} from '../App/App'

import './Header.scss'
import { List, Skeleton, Space } from 'antd'

interface HeaderProps {
  loading?:boolean
}

export const Header:FC<HeaderProps> = ({loading=false}) => {
  const loginInfo = useContext(LoginContext)
  const {t} = useTranslation()

  if (loading) {
    return (
      <header className='flex items-center p-10' style={{height:'100px'}}>
        <Skeleton avatar active />
        <Skeleton active />
        <Skeleton active />
      </header>
    )
  }

  return (
    <header>
      <nav>
        <label htmlFor="cb-burger-menu" className='burger-menu'>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </label>
        <input type="checkbox" id="cb-burger-menu" hidden/>
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
