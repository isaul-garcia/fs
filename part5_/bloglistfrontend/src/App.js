import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogsFromApi = await blogService.getAll()
      setBlogs(blogsFromApi.sort((a, b) => b.likes - a.likes))
    }
    fetchAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.clearToken()
  }

  const blogFormRef = useRef()

  const addNewBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))

      blogFormRef.current.toggleVisibility()

      notify({
        message: `A new blog "${blogObject.title}" by ${blogObject.author} was added succesfully!`,
        type: 'success',
      })
    } catch (error) {
      notify({
        message: 'Could not create a new blog entry',
        type: 'error',
      })
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const blog = blogs.filter((blog) => blog.id === blogId)

      if (window.confirm(`Delete "${blog[0].title}" by ${blog[0].author}?`)) {
        await blogService.remove(blogId)

        setBlogs(blogs.filter((blog) => blog.id !== blogId))
      }
      notify({
        message: 'The blog was deleted',
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      notify({
        message: 'Could not delete blog',
        type: 'error',
      })
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)

      const updatedBlog = {
        ...blogObject,
        id,
      }

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      notify({
        message: `You liked "${updatedBlog.title}"`,
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      notify({
        message: 'Could not like post',
        type: 'error',
      })
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification notification={notification} />

      {user === null ?
        <>
          <Togglable buttonLabel="Log in">
            <LoginForm
              loginService={loginService} blogService={blogService}
              setUser={setUser} notify={notify}
            />
          </Togglable>
          <hr />
        </>
        :
        <div style={{ marginBottom: '16px' }}>
          <p>{user.name} is logged in <button onClick={handleLogout}>Logout</button></p>
          <hr />
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm
              blogService={blogService} blogFormRef={blogFormRef}
              blogs={blogs} setBlogs={setBlogs}
              addNewBlog={addNewBlog}
            />
          </Togglable>
        </div>
      }

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
