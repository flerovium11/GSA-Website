import {NavLink} from 'react-router-dom'
import {useContext, FC, useEffect, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {LoginContext} from '../App/App'

import './Header.scss'
import {Skeleton} from 'antd'

interface HeaderProps {
  loading?:boolean
}

export const Header:FC<HeaderProps> = ({loading=false}) => {
  const username = useContext(LoginContext)
  const {t} = useTranslation()
  const cbRef = useRef<null|HTMLInputElement>(null)

  useEffect(() => {
    const handleClick = (e:MouseEvent) => {
      if (cbRef.current?.checked && e.target !== cbRef.current && !cbRef.current.nextElementSibling?.contains(e.target as HTMLElement)) cbRef.current.checked = false
    }

    window.addEventListener('click', handleClick)

    return () => {window.removeEventListener('click', handleClick)}
  }, [])

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
    <header className={username === null ? undefined : 'loggedin'}>
      <nav className='nav_header'>
        <input type="checkbox" ref={cbRef} id="cb-burger-menu" hidden/>
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
          <li><NavLink to='/results'>Ergebnisse</NavLink></li>
          {username !== null && <li><NavLink to='/admin'>{username}</NavLink></li>}
        </ul>
      </nav>
    </header>
  )
}
