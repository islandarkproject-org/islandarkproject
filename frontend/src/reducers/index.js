import { combineReducers } from 'redux'
import media from './media'
import userLocation from './userLocation'
import userSession from './userSession'
import loginDetails from './loginDetails'

const iapApp = combineReducers({
  media,
  userLocation,
  userSession,
  loginDetails
})

export default iapApp
