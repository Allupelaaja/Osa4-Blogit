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

module.exports = {
    dummy,
    totalLikes
}