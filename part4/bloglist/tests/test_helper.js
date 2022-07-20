const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Amazing coding tips",
        author: "Juan del Pueblo",
        url: "https://amazingblog.com/article/23",
        likes: 120
    },
    {
        title: "Great food recipes",
        author: "Matias del Sol",
        url: "https://greatrecipe.com/article/20",
        likes: 20
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "willremovethissoon", url: "willremovethissoon", likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}