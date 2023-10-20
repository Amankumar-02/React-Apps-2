import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth.js'
import { login, logout } from './app/auth/authSlice'
import { Header, Footer } from './components/index'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  // here auth gives the appwrite status, then we pass the auth to the store 
  //chech status true or false, then dispatch to slice // 3 step work
  useEffect(()=>{
    authService.getCurrentUser()
    .then(data=>{
      if(data){
        dispatch(login({data}))
      }else{
        dispatch(logout())
      }
    })
    .catch(error=>{console.log('Login Status Error Found', error)})
    // here finally is always execute 
    .finally(()=>setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </div>
    </div>
  ) : null
}

export default App
