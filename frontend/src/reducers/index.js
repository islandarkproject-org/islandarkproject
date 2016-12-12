import { combineReducers } from 'redux'
import media from './media'
import userLocation from './userLocation'
import userIsLoggedIn from './userIsLoggedIn'
import loginDetails from './loginDetails'
import registerDetails from './registerDetails'
import files from './files'
import { reducer as formReducer } from 'redux-form'

const iapApp = combineReducers({
  media,
  userLocation,
  userIsLoggedIn,
  loginDetails,
  registerDetails,
  files,
  form: formReducer
})

export default iapApp
