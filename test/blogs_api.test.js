const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
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

test('a valid blog can be added ', async () => {

    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Schoolman Mcsmart',
        url: 'http://www.wikipedia.org',
        likes: 101,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: await helper.loginUser() })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)

    expect(titles).toContain(
        'async/await simplifies making async calls'
    )
})

test('blog without title and url is not added', async () => {

    const newBlog = {
        author: 'notitle testblog',
        likes: 11,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: await helper.loginUser() })
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without likes has 0 likes as default', async () => {

    const newBlog = {
        title: "testing blog for testing",
        author: 'nolikes testing',
        url: 'http://www.nicesite.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: await helper.loginUser() })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(likes[helper.initialBlogs.length]).toEqual(0)
})

test('blog has field id instead of _id ', async () => {

    const newBlog = {
        title: 'id field testing',
        author: 'Testerperson',
        url: 'http://www.test.org',
        likes: 11,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: await helper.loginUser() })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[0].id).toBeDefined()
})

test('a blog cannot be added without token ', async () => {

    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Schoolman Mcsmart',
        url: 'http://www.wikipedia.org',
        likes: 101,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})