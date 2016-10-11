import { connect } from 'react-redux'
import { setUserLocation } from '../actions'
import LocationEnter from '../components/LocationEnter'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    location: state.userLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserLocation: (location) => dispatch(setUserLocation(location))
  }
}

const LocationEnterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationEnter)

export default LocationEnterContainer
