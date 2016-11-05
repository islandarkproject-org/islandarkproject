import { connect } from 'react-redux'
import { upload, uploadMedia, updateUploadInfo } from '../actions'
import Uploader from '../components/Uploader'

const mapStateToProps = (state) => {
  return {
    uploadedMedia: state.media
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	upload: (media) => dispatch(upload(media)),
    uploadMedia: (media) => dispatch(uploadMedia(media)),
    updateUploadInfo: (field, value) => dispatch(updateUploadInfo(field, value))
  }
}

const UploaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)

export default UploaderContainer
