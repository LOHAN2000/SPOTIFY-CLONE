import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { AuthCallBackPage } from './pages/auth-callback/AuthCallBackPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/auth-callback' element={<AuthCallBackPage/>}/>
      </Routes>
    </>
  )
}

export default App;
