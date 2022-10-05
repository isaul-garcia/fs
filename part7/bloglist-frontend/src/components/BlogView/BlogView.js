import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import CommentForm from './CommentForm/CommentForm'
import { Button } from 'react-bootstrap'
import styles from './BlogView.module.css'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const currentUser = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const addLike = async () => {
    try {
      const { id, title, author, url } = blog
      const updatedBlog = {
        user: blog.user.id || blog.user,
        title,
        author,
        url,
        likes: blog.likes + 1
      }
      dispatch(likeBlog(id, updatedBlog))
    } catch (err) {
      console.error(err)
      dispatch(
        setNotification(
          { notification: `Error! ${err}`, type: 'danger' },
          5
        ),
      )
    }
  }

  const deleteBlog = async () => {
    try {
      if (window.confirm(`Remove "${blog?.title}" by ${blog?.author}`)) {
        dispatch(removeBlog(blog.id))
        navigate('/')
        dispatch(
          setNotification(
            { notification: 'Successfully removed blog', type: 'success' },
            5
          ),
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(
        setNotification(
          { notification: `Error! ${err}`, type: 'danger' },
          5
        ),
      )
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className={styles.blog}>
      <span className={styles.title} style={{ marginRight: '8px' }}>
        {blog.title} <a className={styles.linkbutton} href={blog.url}>🔗</a>
      </span>
      <span className={styles.author} style={{ marginRight: '8px' }}>
        by {blog.author}
      </span>

      <p className={styles.poster}>― {blog?.username || blog.user.username}</p>
      <div className={styles.likes}>
        <p className={styles.counter}>
          {blog.likes}
        </p>
        {currentUser && (
          <Button className={styles.likebutton} id="like-button" onClick={addLike}>✦ Like</Button>
        )}
      </div>
      {currentUser?.username === blog.user?.username || blog?.username === currentUser?.username ? (
        <Button style={{ marginLeft: '8px' }} variant="danger" id="delete-button" onClick={deleteBlog}>
         ✖ Delete
        </Button>
      ) : null}

      <hr />
      <h3>Comments</h3>
      {currentUser && (
        <CommentForm />
      )}
      <hr />
      {blog.comments && blog.comments.length !== 0 ? (
        <ul className={styles.comments}>
          {blog.comments?.map((comment) => (
            <li key={comment.id} className={styles.comment}>{comment?.content}</li>
          ))}
        </ul>
      ) : (
        <span>No comments yet</span>
      )}
    </div>
  )
}

export default BlogView
