import { UPLOAD_MEDIA } from '../actions'
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
    default:
      return state
  }
}

export default media
