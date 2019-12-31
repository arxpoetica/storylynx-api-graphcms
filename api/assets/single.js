import { cmsQuery } from '../../loaders.js'

export async function single({ slug }) {

	const { resource } = await cmsQuery(`{
		resource(where: { slug: "${slug}" }) {
			id
			publishedDatetime
			title
			summary
			detail { html }
			assets { id url summary handle fileName width height mimeType }
			assetLinks {
				summary
				link
				cover { url handle }
			}
			tags { tag }
			contentType
			year
			subject
			source
		}
	}`)
	return { resource }

}
