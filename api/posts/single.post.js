const { cms_query } = require('../../loaders.js')

module.exports = async function({ slug }) {
	const { post } = await cms_query(`query {
		post: article(where: { slug: "${slug}" }) {
			slug
			headline
			subheadline
			byline
			published: publishedDatetime
			detail { html }
			assets { id url summary handle filename: fileName width height }
			tags { tag }
			linkBack
		}
	}`)

	post.tags = post.tags.map(tag => tag.name)
	post.html = post.detail && post.detail.html ? post.detail.html : ''

	return { post }
}
