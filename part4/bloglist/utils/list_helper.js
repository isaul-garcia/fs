/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const total = blogs.reduce((total, curr) => {
		return total + curr.likes
	}, 0)
	return total
}

const favoriteBlog = (blogs) => {
	if (!blogs || blogs.length === 0) {
		return null
	}

	const max = blogs.reduce((prev, curr) => {
		if (prev.likes > curr.likes) {
			return prev
		} else {
			return curr
		}
	})

	const fav = {
		title: max.title,
		author: max.author,
		likes: max.likes
	}

	return fav
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}