import { combineReducers } from 'redux'
import media from './media'
import userLocation from './userLocation'
import loginDetails from './loginDetails'

const iapApp = combineReducers({
  media,
  userLocation,
  loginDetails
})

export default iapApp
