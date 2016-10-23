import { UPDATE_REGISTER_DETAILS, REGISTER } from '../actions'

const defaultState = {
	username: '',
	password: '',
	confirmPassword: '',
	email: '',
	fName: ''
}

function registerDetails (state = defaultState, action) {
	switch (action.type) {
		case UPDATE_REGISTER_DETAILS:
			return Object.assign(
				{},
				state,
				{
					[action.field]: action.value
				}
			)
		case REGISTER:
			return defaultState
		default:
			return state
	}
}

export default registerDetails
