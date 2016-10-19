import { USER_LOGGED_IN } from '../actions'

function userIsLoggedIn (state = false, action) {
	switch (action.type) {
		case USER_LOGGED_IN:
			return action.bool
		default:
			return state
	}
}

export default userIsLoggedIn
