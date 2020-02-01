const { cms_query } = require('../../loaders.js')

module.exports = async function({ name }) {

	// TODO: maybe just return modal, root clip, and sequence IDs
	// -- load sequences seperately???
	const { modal } = await cms_query(`query {
		modal(where: { name: "${name.toLowerCase()}" }) {
			id
			name
			rootclip {
				id
				name
				order
				type
				sequences: children {
					id
					name
					order
					type
					classes
					styles
					html { html }
					clips: children {
						id
						name
						order
						type
						classes
						styles
						html { html }
						# assets { id }
						# intervals { id }
						# children {}
					}
				}
			}
		}
	}`)

	return { modal }

}
