import { SET_USER_LOCATION } from '../actions'

const defaultState = {
  lat: undefined,
  lng: undefined
}

function userLocation (state = defaultState, action) {
  switch (action.type) {
    case SET_USER_LOCATION:
      return action.location
    default:
      return state
  }
}

export default userLocation
