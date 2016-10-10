import { LOG_IN } from '../actions'

function logIn (state = {}, action) {
  switch (action.type) {
    case LOG_IN:
      return action.details
    default:
      return state
  }
}

export default logIn
