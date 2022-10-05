import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { createComment } from '../../../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const CommentForm = () => {
  const [inputValue, setInputValue] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value

    setInputValue(value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    try {
      const content = inputValue
      const comment = {
        content,
      }
      const blogId = blog.id

      dispatch(createComment(blogId, comment))
      setInputValue('')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <form onSubmit={addComment}>
      <div>
        <input
          type="text"
          name="comment"
          value={inputValue || ''}
          onChange={handleInputChange}
        />
        <Button style={{ marginLeft: '10px' }} type="submit">
          Add comment
        </Button>
      </div>
    </form>
  )
}

export default CommentForm