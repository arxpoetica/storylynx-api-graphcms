import fetch from 'node-fetch'

export const cmsQuery = async function(query) {
	try {
		const res = await fetch(process.env.LYNX_GRAPHCMS_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.LYNX_GRAPHCMS_TOKEN,
			},
			body: JSON.stringify({ query }),
		})
		const json = await res.json()
		if (json.errors) { throw Error(json.errors.map(err => `  ${err.message}`).join('\n')) }
		return json.data
	} catch (error) {
		console.log(require('ansi-colors').red('cmsQuery Errors:\n'), error.message)
		return { error: 1, message: error.message }
	}
}

// MIGHT USE LATER:

// export const cmsMutate = async function(query, variables) {
// 	try {
// 		const res = await fetch(process.env.LYNX_GRAPHCMS_ENDPOINT, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: 'Bearer ' + process.env.LYNX_GRAPHCMS_MUTATE_TOKEN,
// 			},
// 			body: JSON.stringify({ query, variables }),
// 		})
// 		const json = await res.json()
// 		if (json.errors) { throw Error(json.errors.map(err => `  ${err.message}`).join('\n')) }
// 		return json.data
// 	} catch (error) {
// 		console.log(require('ansi-colors').red('cmsMutate Errors:\n'), error.message)
// 		return { error: 1, message: error.message }
// 	}
// }
