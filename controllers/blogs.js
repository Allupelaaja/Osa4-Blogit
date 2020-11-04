const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save().catch(exception => {
        response.status(400).json(exception)
      })
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter