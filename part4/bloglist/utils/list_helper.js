const dummy = () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
  ]

  return blogs.length
}

const totalLikes = (blogs) => {
  return blogs.likes
}
  
module.exports = {
  dummy,
  totalLikes
}