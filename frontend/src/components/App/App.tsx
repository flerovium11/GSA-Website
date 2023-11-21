import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import Header from '../Header'

import Home from '../../pages/Home'

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
