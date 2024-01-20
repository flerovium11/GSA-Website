import {FC, createContext, Context} from 'react'
import {Route, Routes} from 'react-router-dom'
import type {loginInfoType} from '../../utils/backend'
import {getLoginInfo, setLoginInfo, syncBackendRequest} from '../../utils/backend'
import {WarningOutlined} from '@ant-design/icons'

import Header from '../Header'
import Footer from '../Footer'
import Home from '../../pages/Home'
import BlogOverview from '../../pages/BlogOverview'
import Blog from '../../pages/Blog'
import Login from '../../pages/Login'
import Project from '../../pages/Project'
import Admin from '../../pages/Admin'
import Imprint from '../../pages/Imprint'
import Privacy from '../../pages/Privacy'
import About from '../../pages/About'
import Infomessage from '../Infomessage'

const loginInfoResponse = syncBackendRequest('php/logininfo.php', {})
console.log(loginInfoResponse)


if(loginInfoResponse.status === 'success') {
  const parsed = JSON.parse(loginInfoResponse.text)
  setLoginInfo(parsed.username, parsed.token)
} else {
  setLoginInfo('', '')
}

const loginInfo = getLoginInfo()

export const LoginContext:Context<loginInfoType|null> = createContext(null as loginInfoType|null)

export const App:FC = () => {
  return (
    <>
      <LoginContext.Provider value={loginInfo}>
        <Header></Header>

        {loginInfoResponse.status === 'warning' && 
          <Infomessage type='warning' ><WarningOutlined /> {loginInfoResponse.text}</Infomessage>
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogOverview isSite={true}/>} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer></Footer>
      </LoginContext.Provider>
    </>
  )
}
