import * as api from '../api'

/*
 * Action Types
 */

export const UPDATE_LOGIN_DETAILS = 'UPDATE_LOGIN_DETAILS'
export const REGISTER = 'REGISTER'
export const LOG_OUT = 'LOG_OUT'
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
