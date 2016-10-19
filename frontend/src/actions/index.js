import * as api from '../api'

/*
 * Action Types
 */

export const UPDATE_LOGIN_DETAILS = 'UPDATE_LOGIN_DETAILS'
export const REGISTER = 'REGISTER'
export const LOG_IN  = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA'
export const UPDATE_UPLOAD_INFO = 'UPDATE_UPLOAD_INFO'
export const SET_USER_LOCATION = 'SET_USER_LOCATION'

/*
 * Other Constants
 */

/*
 * Action Creators
 */

export function updateLoginDetails (field, value) {
  return {
    type: UPDATE_LOGIN_DETAILS,
    field,
    value
  }
}

export function setIsUserLoggedIn (bool) {
  return {
    type: USER_LOGGED_IN,
    bool
  }
}

export function logIn (details) {
  return api.logIn(details).then((response) => setIsUserLoggedIn(true), (error) => setIsUserLoggedIn(false))
}

export function logOut () {
  return api.logOut().then((response) => setIsUserLoggedIn(false), (error) => console.log(error))
}

export function uploadMedia (media) {
  return {
    type: UPLOAD_MEDIA,
    media
  }
}

export function updateUploadInfo (field, value) {
  return {
    type: UPDATE_UPLOAD_INFO,
    field,
    value
  }
}

export function setUserLocation (location) {
  return {
    type: SET_USER_LOCATION,
    location
  }
}
