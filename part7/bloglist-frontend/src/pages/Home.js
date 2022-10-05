import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'
import BlogForm from '../components/BlogForm/BlogForm'
import Blog from '../components/Blog/Blog'
import Togglable from '../components/Togglable/Togglable'
import { setNotification } from '../reducers/notificationReducer'

const Home = () => {
  const blogs = useSelector((state) => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog({ title, author, url }))
    dispatch(
      setNotification(
        { notification: `A new blog "${title}" by ${author} added succesfully!`, type: 'success' },
        5
      ),
    )
  }

  return (
    <>
      <h2>All Blogs</h2>
      <hr />
      {user === null ? null : (
        <div style={{ marginBottom: '16px' }}>
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm addNewBlog={addBlog} />
          </Togglable>
          <hr />
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  )
}

export default Home