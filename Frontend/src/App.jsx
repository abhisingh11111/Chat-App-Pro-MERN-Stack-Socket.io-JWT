import { useEffect, useState } from 'react'
import Login from './Pages/LogIn/Login'
import './App.css'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './Context/AuthContext'

function App() {
  const {authUser} = useAuthContext() 
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <Login/> */}
      {/* <SignUp/> */}
      {/* <Home/> */}
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}/>
        <Route path='/login' element={authUser?<Navigate to='/'/>:<Login/>}/>
        <Route path='/signup' element={authUser?<Navigate to='/'/> :<SignUp/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
