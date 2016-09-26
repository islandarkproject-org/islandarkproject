import { UPLOAD_MEDIA, UPDATE_UPLOAD_INFO } from '../actions'
import { trimFileExtension } from '../helpers'

function media (state = {}, action) {
  switch (action.type) {
    case UPLOAD_MEDIA:
      return {
        files: action.media,
        info: {
          name: action.media.map(file => trimFileExtension(file.name)).join(' and '),
          description: '',
          tags: [],
          isPrivate: false,
          location: ''
        }
      }
    case UPDATE_UPLOAD_INFO:
      return {
        files: state.files,
        info: Object.assign({}, state.info, { [action.field]: action.value })
      }
    default:
      return state
  }
}

export default media
