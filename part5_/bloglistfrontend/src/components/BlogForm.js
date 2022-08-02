/* eslint-disable linebreak-style */
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="form">
      <h2>Add a new blog</h2>
      <form id='create-blog-form' onSubmit={addBlog}>
        <div className='inputs'>
                    Title:
          <br />
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className='inputs'>
                    Author:
          <br />
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div className='inputs'>
                    Url:
          <br />
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default BlogForm