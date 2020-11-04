const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Blog for testing number 678',
        author: 'Johnny Testman',
        url: 'http://www.google.com',
        likes: 21,
    },
    {
        title: 'Blog about nice flowers',
        author: 'Helena Sherlock',
        url: 'http://www.w3schools.com',
        likes: 2,
    },
    {
        title: 'Last blog about cool things',
        author: 'Matti Meikäläinen',
        url: 'http://www.iltalehti.fi',
        likes: 13,
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}