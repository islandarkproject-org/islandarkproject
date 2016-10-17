import { USER_SESSION_INFO } from '../actions'

function userSession (state = {}, action) {
	switch (action.type) {
		case USER_SESSION_INFO:
			return action.details
		default:
			return state
	}
}

export default userSession
