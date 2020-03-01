const { cms_query } = require('../../loaders.js')

module.exports = async function({ name }) {

	// if (process.env.LYNX_CACHE_STORY) {
	// 	return { story: require('./_cache.js') }
	// }

	// TODO: maybe just return story, root clip, and sequence IDs
	// -- load sequences seperately???
	const { story } = await cms_query(`query {
		story(where: { name: "${name.toLowerCase()}" }) {
			id
			name
			rootclip {
				id
				name
				order
				styles
				html { html }
				sequences: children(orderBy: order_ASC) {
					id
					name
					order
					styles
					html { html }
					clips: children(orderBy: order_ASC) {
						id
						name
						order
						template
						themes
						transition
						styles
						html { html }
						assets { id handle url source summary height width size }
						# intervals { id }
						# children {}
					}
				}
			}
		}
	}`)

	// TODO: how deep will this go? fine for now
	story.rootclip.html = story.rootclip.html.html
	story.rootclip.sequences = story.rootclip.sequences.map(sequence => {
		sequence.html = sequence.html.html
		sequence.clips = sequence.clips.map(clip => {
			clip.html = clip.html.html
			clip.template = clip.template || 'Column'
			return clip
		})
		return sequence
	})

	return { story }

}
