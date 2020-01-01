const { cms_query } = require('../../loaders.js')

module.exports = async function({ slug }) {
	const { article } = await cms_query(`{
		article(where: { slug: "${slug}" }) {
			slug
			headline
			subheadline
			byline
			publishedDatetime
			detail { html }
			assets { id url summary handle fileName width height }
			tags { tag }
			linkBack
		}
	}`)
	return { article }
}
