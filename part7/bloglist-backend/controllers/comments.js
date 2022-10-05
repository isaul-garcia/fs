const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blogAndComments = await Blog.find(id)
    .populate('comments')
  response.json(blogAndComments)
})

commentsRouter.post('/:id/comments', async (request, response,) => {
  const body = request.body
  const token = getTokenFrom(request)
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id } = request.params
  const blog = await Blog.findById(id)

  const comment = new Comment({
    content: body.content,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter