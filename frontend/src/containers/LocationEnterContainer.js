import { connect } from 'react-redux'
import { setUserLocation, updateUploadInfo } from '../actions'
import LocationEnter from '../components/LocationEnter'

const mapStateToProps = (state) => {
  return {
    location: state.media.info.location || state.userLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserLocation: (location) => dispatch(setUserLocation(location)),
    updateUploadInfo: (field, value) => dispatch(updateUploadInfo(field, value))
  }
}

const LocationEnterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationEnter)

export default LocationEnterContainer
