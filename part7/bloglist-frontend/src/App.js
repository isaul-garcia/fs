import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import blogService from './services/blogs'
import Notification from './components/Notification/Notification'
import Navigation from './components/Navigation/Navigation'
import BlogView from './components/BlogView/BlogView'
import UserView from './components/UserView/UserView'
import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'

const App = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedUser'),
    )
    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])

  return (
    <div className="container" >
      <div className="wrapper">
        <Navigation />
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cat" element={<img style={{ width: '350px' }} src="https://pbs.twimg.com/media/Cn_OPpiXgAUsVse.jpg:large" alt="cat burrito" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App