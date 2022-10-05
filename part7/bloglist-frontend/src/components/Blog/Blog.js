import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './Blog.module.css'

const Blog = ({ blog }) => {
  return (
    <Link className={styles.link} to={`/blogs/${blog.id}`}>
      <div className={styles.blog}>
        <span className={styles.title}>{blog.title}</span>
        <span className={styles.author}>By {blog.author}</span>
      </div>
    </Link>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
}