import { LOAD_ALL_FILES } from '../actions'

function files (state = [], action) {
	switch (action.type) {
		case LOAD_ALL_FILES:
			return action.files
		default:
			return state
	}
}

export default files
