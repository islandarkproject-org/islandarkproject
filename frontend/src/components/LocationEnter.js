import React, { PropTypes } from 'react'
import { getUserLocation } from '../helpers'
import BodyText from './BodyText'
import IAPTextInput from './IAPTextInput'
import LeafletMap from './LeafletMap'

class LocationEnter extends React.Component {
  componentDidMount () {
    getUserLocation(
      (latLng) => this.props.setUserLocation(latLng),
      (error) => error
    )
  }

  render () {
    const location = this.props.location
    const map = location && location.lat && location.lng ? <LeafletMap location={location} /> : null

    return (
      <div className='LocationEnter'>
        <BodyText>Enter Your Location</BodyText>
        <IAPTextInput placeholder='Palau' onChange={(e) => e} />
        {map}
      </div>
    )
  }
}

LocationEnter.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, undefined]),
    lng: PropTypes.oneOfType([PropTypes.number, undefined])
  }).isRequired,
  setUserLocation: PropTypes.func.isRequired
}

export default LocationEnter
