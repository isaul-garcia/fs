/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */
import React, { useState } from 'react'


const DeleteButton = ({ deleteBlog }) => <button id="delete-button" onClick={deleteBlog}>Delete</button>

const BlogDetails = ({ blog, user, addLike, deleteBlog }) => {
  const isOwnedByUser = user.username === blog.user.username || user.name === user.name

  return (
    <div className="blog-details">
      <p>{blog.url}</p>
      <p>{blog.likes}<button id="like-button" style={{ marginLeft: '8px' }} onClick={addLike}>Like</button></p>
      <p>{blog.user.name || user.name}</p>
      {isOwnedByUser ? <DeleteButton deleteBlog={deleteBlog} /> : null}
    </div>
  )
}

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDelete = () => deleteBlog(blog.id)

  const handleAddLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div className="blog">
      <span className='title-author' style={{ marginRight: '8px' }}>"{blog.title}" by {blog.author}</span>
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button>
      {showDetails ? (
        <BlogDetails blog={blog} addLike={handleAddLike} user={user} deleteBlog={handleDelete} />
      ) : null}
    </div>
  )
}

export default Blog