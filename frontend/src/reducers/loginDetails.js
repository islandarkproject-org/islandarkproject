import { UPDATE_LOGIN_DETAILS } from '../actions'

const defaultState = {
  username: '',
  password: ''
}

function logInDetails (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_LOGIN_DETAILS:
      return Object.assign(
        {},
        state,
        {
          [action.field]: action.value
        }
      )
    default:
      return state
  }
}

export default logInDetails
