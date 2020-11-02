const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithFourBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '1978578926798qa',
            title: 'Blog for testing number 678',
            author: 'Johnny Testman',
            url: 'http://www.google.com',
            likes: 21,
            __v: 0
        },
        {
            _id: '5490876889afsag',
            title: 'Blog about nice flowers',
            author: 'Helena Sherlock',
            url: 'http://www.w3schools.com',
            likes: 2,
            __v: 0
        },
        {
            _id: '489788979876a7fh',
            title: 'Last blog about cool things',
            author: 'Matti Meikäläinen',
            url: 'http://www.iltalehti.fi',
            likes: 13,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithFourBlogs)
        expect(result).toBe(41)
    })
})

describe('favorite blog', () => {

    const listWithDifferentLikes = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '1978578926798qa',
            title: 'Blog for testing number 678',
            author: 'Johnny Testman',
            url: 'http://www.google.com',
            likes: 21,
            __v: 0
        },
        {
            _id: '5490876889afsag',
            title: 'Blog about nice flowers',
            author: 'Helena Sherlock',
            url: 'http://www.w3schools.com',
            likes: 2,
            __v: 0
        },
        {
            _id: '489788979876a7fh',
            title: 'Last blog about cool things',
            author: 'Matti Meikäläinen',
            url: 'http://www.iltalehti.fi',
            likes: 13,
            __v: 0
        }
    ]

    const listWithSameLikes = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '1978578926798qa',
            title: 'Blog for testing number 678',
            author: 'Johnny Testman',
            url: 'http://www.google.com',
            likes: 5,
            __v: 0
        },
        {
            _id: '489788979876a7fh',
            title: 'Last blog about cool things',
            author: 'Matti Meikäläinen',
            url: 'http://www.iltalehti.fi',
            likes: 2,
            __v: 0
        }
    ]

    test('of empty list is none', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual([])
    })

    test('of bigger list is Blog for testing number 678', () => {
        const result = listHelper.favoriteBlog(listWithDifferentLikes)
        expect(result).toEqual(listWithDifferentLikes[1])
    })

    test('of list with same amount of likes is Go To Statement Considered Harmful', () => {
        const result = listHelper.favoriteBlog(listWithSameLikes)
        expect(result).toEqual(listWithSameLikes[0])
    })
})

describe('most common author', () => {
    const listOfAuthors = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '1978578926798qa',
            title: 'Blog for testing number 678',
            author: 'Johnny Testman',
            url: 'http://www.google.com',
            likes: 21,
            __v: 0
        },
        {
            _id: '5490876889afsag',
            title: 'Blog about nice flowers',
            author: 'Matti Meikäläinen',
            url: 'http://www.w3schools.com',
            likes: 2,
            __v: 0
        },
        {
            _id: '489788979876a7fh',
            title: 'Last blog about cool things',
            author: 'Matti Meikäläinen',
            url: 'http://www.iltalehti.fi',
            likes: 13,
            __v: 0
        }
    ]

    const listOfSameAuthors = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '1978578926798qa',
            title: 'Blog for testing number 678',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.google.com',
            likes: 21,
            __v: 0
        },
        {
            _id: '5490876889afsag',
            title: 'Blog about nice flowers',
            author: 'Matti Meikäläinen',
            url: 'http://www.w3schools.com',
            likes: 2,
            __v: 0
        },
        {
            _id: '489788979876a7fh',
            title: 'Last blog about cool things',
            author: 'Matti Meikäläinen',
            url: 'http://www.iltalehti.fi',
            likes: 13,
            __v: 0
        }
    ]

    const onlyOneAuthor = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('of empty list is none', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('of list with one entry is Edsger W. Dijkstra', () => {
        const result = listHelper.mostBlogs(onlyOneAuthor)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('of list is Matti Meikäläinen', () => {
        const result = listHelper.mostBlogs(listOfAuthors)
        expect(result).toEqual({ author: 'Matti Meikäläinen', blogs: 2 })
    })

    test('of list with multiple authors with same amount is Edsger W. Dijkstra', () => {
        const result = listHelper.mostBlogs(listOfSameAuthors)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
    })
})