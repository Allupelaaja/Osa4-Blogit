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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}