import { combineReducers } from 'redux'
import media from './media'
import userLocation from './userLocation'

const iapApp = combineReducers({
  media,
  userLocation
})

export default iapApp
