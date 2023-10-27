import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import {Signup, Login, Home, AllPosts, AddPost, EditPost, Post} from './pages/index.js'
import {Protected} from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={
          <Protected authentication={false}>
          <Login/>
          </Protected>
          }/>
        <Route path='/signup' element={
          <Protected authentication={false}>
          <Signup/>
          </Protected>
          }/>
        <Route path='/all-posts' element={
          <Protected authentication>
            {""}
          <AllPosts/>
          </Protected>
          }/>
        <Route path='/add-post' element={
          <Protected authentication>
            {""}
          <AddPost/>
          </Protected>
          }/>
        <Route path='/edit-post/:slug' element={
          <Protected authentication>
            {""}
          <EditPost/>
          </Protected>
          }/>
        <Route path='/post/:slug' element={<Post/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
