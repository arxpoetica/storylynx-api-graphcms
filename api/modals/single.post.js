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
				classes
				styles
				html { html }
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

	// TODO: how deep will this go? fine for now
	modal.rootclip.html = modal.rootclip.html.html
	modal.rootclip.sequences = modal.rootclip.sequences.map(sequence => {
		sequence.html = sequence.html.html
		sequence.clips = sequence.clips.map(clip => {
			clip.html = clip.html.html
			return clip
		})
		return sequence
	})

	return { modal }

}
