import * as api from '../api'

/*
 * Action Types
 */

export const LOG_IN = 'LOG_IN'
export const REGISTER = 'REGISTER'
export const LOG_OUT = 'LOG_OUT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA'
export const UPDATE_UPLOAD_INFO = 'UPDATE_UPLOAD_INFO'

/*
 * Other Constants
 */

/*
 * Action Creators
 */

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
