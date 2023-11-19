import {useState, useEffect} from 'react'
import Header from '../Header'
import {syncBackendRequest, backendRequest} from '../../utils/backend'
import './App.scss'

export const App = () => {
  const [data, setData] = useState<string>('')
  const message = syncBackendRequest('php/test.php', {test: 'test'})

  useEffect(() => {
    backendRequest('php/test.php', {test: 'test'}).then(
      (result) => {
        setData(result.response)
      },
      (error) => {
  
      }
    )
  }, [])

  return (
    <>
      <Header></Header>
      <h5>Sync response:</h5>
      {message.response}
      <h5>Async response:</h5>
      {data}
    </>
  )
}
