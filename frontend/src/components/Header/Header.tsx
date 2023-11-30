import {getLoginInfo} from '../../utils/backend'
import {NavLink} from 'react-router-dom'

import './Header.scss'

const loginInfo = getLoginInfo()

export const Header = () => {
  return (
    <header>
      <nav>
        <label htmlFor="cb-burger-menu" className='burger-menu'>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </label>
        <input type="checkbox" id="cb-burger-menu" hidden/>
        <ul>
          <li><NavLink to='/'><img src='/graphics/icon-logo.png' alt='GSA Logo' /></NavLink></li>
          <li><NavLink to='/project'>Das Projekt</NavLink></li>
          <li><NavLink to='/blog'>Blog</NavLink></li>
          <li><NavLink to='/about'>Wir</NavLink></li>
          {loginInfo && <li><NavLink to='/admin'>Admin</NavLink></li>}
        </ul>
      </nav>
    </header>
  )
}
