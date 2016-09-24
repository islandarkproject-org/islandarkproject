import { UPLOAD_MEDIA } from '../actions'
import { trimFileExtension } from '../helpers'

function media (state = [], action) {
  switch (action.type) {
    case UPLOAD_MEDIA:
      return [
        ...state
      ].concat(action.media.map((file) => {
        return {
          file: file,
          info: {
            name: trimFileExtension(file.name),
            description: '',
            tags: [],
            isPrivate: false,
            location: ''
          }
        }
      }))
    default:
      return state
  }
}

export default media
