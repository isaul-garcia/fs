import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addNewBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    })
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'ADD_LIKE',
      data: { id },
    })
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const blogId = id
    let newComment = await blogService.addComment(id, comment)
    newComment = { ...newComment, blogId }
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}

const reducer = (state = [], action) => {
  const { type, data } = action

  switch (type) {
  case 'INIT_BLOGS':
    return data

  case 'NEW_BLOG':
    return [...state, data]

  case 'DELETE_BLOG': {
    const { id } = action.data
    return state.filter((blog) => blog.id !== id)
  }

  case 'ADD_LIKE': {
    const { id } = action.data
    const likedBlog = state.find((blog) => blog.id === id)
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
    }
    return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
  }

  case 'NEW_COMMENT': {
    const { id } = action.data
    const { blogId } = action.data
    const { content } = action.data
    const blog = state.find((blog) => blog.id === blogId)
    const newComment = { content, id }
    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, newComment],
    }
    return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog))
  }

  default:
    return state
  }
}

export default reducer