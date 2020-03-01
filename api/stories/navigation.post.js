const { cms_query } = require('../../loaders.js')

module.exports = async function({ name }) {

	let { navigation } = await cms_query(`query {
		navigation: story(where: { name: "${name.toLowerCase()}" }) {
			id
			rootclip {
				id
				sequences: children {
					id
					order
					name
					clips: children {
						id
						order
						name
					}
				}
			}
		}
	}`)

	navigation = navigation.rootclip
	// TODO: how deep will this go? fine for now
	// SEE: https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
	navigation.sequences = navigation.sequences.map(sequence => {
		sequence.clips = sequence.clips.sort((clip_a, clip_b) => {
			return clip_a.order.localeCompare(clip_b.order, undefined, {
				numeric: true,
				sensitivity: 'base',
			})
		})
		return sequence
	})
	navigation.sequences = navigation.sequences.sort((seq_a, seq_b) => {
		return seq_a.order.localeCompare(seq_b.order, undefined, {
			numeric: true,
			sensitivity: 'base',
		})
	})

	return { navigation }
}
