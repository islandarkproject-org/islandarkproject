function media (state = [], action) {
  switch (action.type) {
    case 'UPLOAD_MEDIA':
      return [
        ...state,
        {
          media: action.media
        }
      ]
    default:
      return state
  }
}

export default media
