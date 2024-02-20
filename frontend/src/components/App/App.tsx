import {FC, createContext, Context, useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import type {loginInfoType, responseDataType} from '../../utils/backend'
import {getLoginInfo, backendRequest} from '../../utils/backend'
import {DotChartOutlined, WarningOutlined} from '@ant-design/icons'

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
import { Skeleton, Space } from 'antd'

export const LoginContext:Context<loginInfoType|null> = createContext(null as loginInfoType|null)

export const App:FC = () => {
  const [loginInfo, setLoginInfo] = useState<loginInfoType|null>(null)
  const [loginInfoResponse, setLoginResponse] = useState<responseDataType|null>(null)
  const [isLoadingLoginInfo, setIsLoadingLoginInfo] = useState<string>('')

  const updateLoadingInfo = (info:string) => {
    console.log(isLoadingLoginInfo)
    setIsLoadingLoginInfo((prev) => prev === '' ? '' : info)
  }

  useEffect(() => {
    // when a user cookie is set, try to contact backend
    if(getLoginInfo() !== null) {
      setIsLoadingLoginInfo('Loading admin user interface...')

      setTimeout(() => updateLoadingInfo('Hang on...'), 1000)
      setTimeout(() => updateLoadingInfo('This is taking longer than expected...'), 2000)

      backendRequest('php/logininfo.php', {}, true).then((response) => {
        console.log(response)
        setLoginResponse(response)
      }).catch((reason) => {
        console.log(reason)
        setLoginResponse(reason)
      }).finally(() => {
        const fetchedLoginInfo = getLoginInfo()
        setLoginInfo(fetchedLoginInfo)
        setIsLoadingLoginInfo('')
      })
    } else {
      const fetchedLoginInfo = getLoginInfo()
      setLoginInfo(fetchedLoginInfo)
    }
  }, [])

  return (
    <>
      <LoginContext.Provider value={loginInfo}>
        {/* when the user cookie is set but the server doesn't respond display the error message*/}
        {(loginInfoResponse?.status === 'warning' || loginInfoResponse?.status === 'connerror') && 
          <Infomessage type='warning' ><WarningOutlined /> {loginInfoResponse.text}</Infomessage>
        }

        <Header loading={isLoadingLoginInfo !== ''} />

        {isLoadingLoginInfo !== '' && 
          <main className='p-10 mt-28 m-auto w-2/3'>
            <h2 className='pt-0 mb-5'>{isLoadingLoginInfo}</h2>
            <Space>
              <Skeleton.Button active/>
              <Skeleton.Avatar active/>
              <Skeleton.Input active/>
            </Space>
              <br />
              <br />
              <Skeleton.Button    />
              <br />
              <br />
              <Skeleton.Input active/>
              <br />
              <br />
            <Space>
              <Skeleton.Image  />
              <Skeleton.Node >
                  <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
              </Skeleton.Node>
            </Space>
            <Skeleton className='mt-10' active />
          </main>
        }

        {isLoadingLoginInfo === '' && <>
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

        </>}
        <Footer loading={isLoadingLoginInfo !== ''} />
      </LoginContext.Provider>
    </>
  )
}
