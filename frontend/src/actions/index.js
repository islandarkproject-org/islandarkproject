/*
 * Action Types
 */

export const LOG_IN = 'LOG_IN'
export const REGISTER = 'REGISTER'
export const LOG_OUT = 'LOG_OUT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA'
export const SET_FILTER = 'SET_FILTER'

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
