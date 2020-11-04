const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Blog for testing number 678',
        author: 'Johnny Testman',
        url: 'http://www.google.com',
        likes: 21,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f6',
        title: 'Blog about nice flowers',
        author: 'Helena Sherlock',
        url: 'http://www.w3schools.com',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f5',
        title: 'Last blog about cool things',
        author: 'Matti Meikäläinen',
        url: 'http://www.iltalehti.fi',
        likes: 13,
        __v: 0
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
        'Blog for testing number 678'
    )
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(4)
})

test('the first blog is about Go To Statement Considered Harmful', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Go To Statement Considered Harmful')
})

afterAll(() => {
    mongoose.connection.close()
})