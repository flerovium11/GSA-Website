import {FC, createContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import {setLoginInfo, syncBackendRequest} from '../../utils/backend'

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

const loginInfo = syncBackendRequest('php/logininfo.php', {})
console.log(loginInfo)

if(loginInfo.status === 'success') {
  const parsed = JSON.parse(loginInfo.text)
  setLoginInfo(parsed.username, parsed.token)
} else {
  setLoginInfo('', '')
}

export const LoginContext = createContext({status: 'error', text: 'Access denied'})

export const App:FC = () => {
  return (
    <>
      <LoginContext.Provider value={loginInfo}>
        <Header></Header>
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
