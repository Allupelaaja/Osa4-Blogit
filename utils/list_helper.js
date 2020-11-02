var lodash = require('lodash')

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
    const result = lodash.values(lodash.groupBy(blogAuthors)).map(d => ({ name: d[0], count: d.length }));

    //Katsotaan mitä löytyy eniten
    var biggestCount =
        Math.max.apply(Math, result.map(function (f) {
            return f.count
        }))

    var favorite =
        result.find(function (f) {
            return f.count == biggestCount
        })

    //Muutetaan vielä objektin muotoa
    var author =
    {
        author: favorite.name,
        blogs: favorite.count
    }

    return author
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}