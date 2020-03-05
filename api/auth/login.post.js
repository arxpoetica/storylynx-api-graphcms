const { cms_query } = require('../../loaders.js')

module.exports = async function({ username }) {

	const answer = await cms_query(`{
		account(where: { username: "${username}" }) {
			username
			hash
			salt
			role
			firstName
			lastName
			avatar { url handle }
		}
	}`)

	return { answer }

}
