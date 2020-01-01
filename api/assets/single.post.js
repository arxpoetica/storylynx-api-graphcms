const { cms_query } = require('../../loaders.js')

module.exports = async function({ slug }) {

	const { resource } = await cms_query(`{
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
