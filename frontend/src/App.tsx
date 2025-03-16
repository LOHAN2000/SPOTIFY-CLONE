import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { AuthCallBackPage } from './pages/auth-callback/AuthCallBackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { MainLayout } from './layout/MainLayout';
import { ChatPage } from './pages/chat/ChatPage';
import { Collection } from './pages/collection/Collection';

function App() {
  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={'/auth-callback'}/>}/>
        <Route path='/auth-callback' element={<AuthCallBackPage/>}/>

        <Route element={<MainLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
          <Route path='/album/:id' element={<Collection/>}/>
          <Route path='/playlist/:id' element={<Collection/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
