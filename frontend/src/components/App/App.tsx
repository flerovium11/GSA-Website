import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {syncBackendRequest, backendRequest} from '../../utils/backend'

import Header from '../Header'
import Home from '../../pages/Home'

import './App.scss'

export const App:FC = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </>
  )
}
