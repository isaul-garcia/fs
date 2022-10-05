import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import styles from './BlogForm.module.css'

const BlogForm = ({ addNewBlog }) => {
  const [inputValues, setInputValues] = useState(null)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const handleAddBlog = (event) => {
    event.preventDefault()
    const title = inputValues?.title
    const author = inputValues?.author
    const url = inputValues?.url

    const blog = {
      title,
      author,
      url
    }

    addNewBlog(blog)
    setInputValues({ author: '', title: '', url: '' })
  }

  return (
    <div className="form">
      <h4>Add a new blog</h4>
      <form id="create-blog-form" onSubmit={handleAddBlog}>
        <div className="inputs">
          Title:
          <br />
          <input name="title" value={inputValues?.title || ''} onChange={handleInputChange} />
        </div>
        <div className="inputs">
          Author:
          <br />
          <input name="author" value={inputValues?.author || ''} onChange={handleInputChange} />
        </div>
        <div className="inputs" style={{ marginBottom: '20px' }}>
          Url:
          <br />
          <input
            name="url"
            value={inputValues?.url || ''}
            onChange={handleInputChange} />
        </div>
        <Button className={styles.btn} variant="success" type="submit">Create</Button>
      </form>
    </div>
  )
}

export default BlogForm

BlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
}

