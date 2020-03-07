const bcrypt = require('bcryptjs')
const { cms_query } = require('../../loaders.js')

module.exports = async function({ username, password }) {

	// NOTE: only a basic checks here...
	// normally protect against injection attacks, etc...
	// TODO: check that username is a correctly formatted email?????????
	if (typeof username !== 'string' || username.length < 3) {
		return { error: 'Username must be at least 3 characters.' }
	} else if (typeof password !== 'string' || password.length < 8) {
		return { error: 'Incorrect password.' }
	}

	const answer = await cms_query(`{
		account(where: { username: "${username}" }) {
			username
			hash
			salt
			role
			first
			last
			avatar { url handle }
		}
	}`)

	// further checks, including password...
	if (answer.error) {
		return { error: 'Something went wrong. Please contact the code wizards 🧙‍♂️.' }
	} else if (!answer.account) {
		return { error: 'User not found.' }
	}

	const { account } = answer
	// FIXME: (un)salt this
	const match = await bcrypt.compare(password, account.hash)
	if (!match) {
		return { error: 'Incorrect password.' }
	}

	return {
		role: account.role,
		first: account.first,
		last: account.last,
		avatar: account.avatar,
	}

}
