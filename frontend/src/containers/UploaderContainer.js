import { connect } from 'react-redux'
import { uploadMedia, updateUploadInfo } from '../actions'
import Uploader from '../components/Uploader'

const mapStateToProps = (state) => {
  console.log(state.media)
  return {
    uploadedMedia: state.media
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadMedia: (media) => dispatch(uploadMedia(media)),
    updateUploadInfo: (field, value) => dispatch(updateUploadInfo(field, value))
  }
}

const UploaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)

export default UploaderContainer
