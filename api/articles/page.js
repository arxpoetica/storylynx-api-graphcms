import { cmsQuery } from '../../loaders.js'

export async function page({ page, page_size, tags }) {

	let where
	if (tags && tags.length) {
		where = '{ AND: [{ status: PUBLISHED }, '
		where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
		where += '] }'
	} else {
		where = '{ status: PUBLISHED }'
	}

	const { articles, articlesConnection } = await cmsQuery(`{
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
		page_size,
		items: articles,
		itemsCount: articlesConnection.aggregate.count,
	}

}
