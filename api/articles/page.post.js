const { cms_query } = require('../../loaders.js')

module.exports = async function({ page, page_size, tags }) {

	let where
	if (tags && tags.length) {
		where = '{ AND: [{ status: PUBLISHED }, '
		where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
		where += '] }'
	} else {
		where = '{ status: PUBLISHED }'
	}

	const { articles, articlesConnection } = await cms_query(`{
		articles(
			first: ${page_size},
			skip: ${(page - 1) * page_size},
			where: ${where},
			orderBy: publishedDatetime_DESC
		) {
			id
			publishedDatetime
			headline
			subheadline
			slug
			assets { id url summary handle mimeType fileName }
			tags { tag }
		}

		articlesConnection(where: ${where}) { aggregate { count } }
	}`)

	return {
		items: articles,
		items_count: articlesConnection.aggregate.count,
	}

}
