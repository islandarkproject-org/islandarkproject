import { combineReducers } from 'redux'
import media from './media'
import userLocation from './userLocation'
import userIsLoggedIn from './userIsLoggedIn'
import loginDetails from './loginDetails'
import registerDetails from './registerDetails'
import files from './files'

const iapApp = combineReducers({
  media,
  userLocation,
  userIsLoggedIn,
  loginDetails,
  registerDetails,
  files
})

export default iapApp
