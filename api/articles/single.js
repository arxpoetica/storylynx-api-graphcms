import { cmsQuery } from '../../loaders.js'

export async function single({ slug }) {

	const { article } = await cmsQuery(`{
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
