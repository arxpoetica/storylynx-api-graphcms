const { cms_query } = require('../../loaders.js')

module.exports = async function({ slug }) {

	const { asset_group } = await cms_query(`{
		asset_group: resource(where: { slug: "${slug}" }) {
			id
			published: publishedDatetime
			title
			summary
			detail { html }
			assets { id url summary handle filename: fileName width height mime_type: mimeType }
			asset_links: assetLinks {
				summary
				link
				cover { url handle }
			}
			tags { name: tag }
			content_type: contentType
			year
			subject
			source
		}
	}`)

	asset_group.tags = asset_group.tags.map(tag => tag.name)

	return { asset_group }

}
