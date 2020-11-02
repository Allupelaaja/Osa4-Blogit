var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var likeAmount = 0

    blogs.forEach(blog => {
        likeAmount += blog.likes
    });

    return likeAmount
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) {
        return blogs
    }

    var mostLikes =
        Math.max.apply(Math, blogs.map(function (f) {
            return f.likes
        }))

    var favorite =
        blogs.find(function (f) {
            return f.likes == mostLikes
        })

    return favorite
}

const mostBlogs = (blogs) => {

    if (blogs.length == 0) {
        return {}
    }

    var index = 0
    var blogAuthors = []

    //Otetaan ylös kaikki authorit (myös samat)
    blogs.forEach(blog => {
        blogAuthors[index] = blog.author
        index++
    });

    //Lasketaan authorien esiintyvyydet
    const result = _.values(_.groupBy(blogAuthors)).map(d => ({ author: d[0], blogs: d.length }));

    //Katsotaan mitä löytyy eniten
    var biggestCount =
        Math.max.apply(Math, result.map(function (blog) {
            return blog.blogs
        }))

    var favorite =
        result.find(function (blog) {
            return blog.blogs == biggestCount
        })

    return favorite
}

const mostLikes = (blogs) => {
    if (blogs.length == 0) {
        return {}
    }

    //Otetaan ylös kaikki uniquet authorit
    const authorNames = _.uniq(_.map(blogs, "author"))

    var blogAuthors = []

    //Lasketaan authorien liket yhteen
    _.forEach(authorNames, (name, index) => {
        var sum = 0
        _.forEach(blogs, blog => {
            if (blog.author === name) {
                sum += blog.likes
                blogAuthors[index] = {
                    author: name,
                    likes: sum
                }
            }
        })
    });

    //Katsotaan mitä löytyy eniten
    var mostLikes =
        Math.max.apply(Math, blogAuthors.map(function (author) {
            return author.likes
        }))

    var favorite =
        blogAuthors.find(function (author) {
            return author.likes == mostLikes
        })

    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}