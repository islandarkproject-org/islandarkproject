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
    const locationEntry = location && location.lat && location.lng ?
      <LeafletMap
        location={location}
        onMapClick={(e) => this.props.updateUploadInfo('location', Object.assign({}, e.latlng))}
        height={300}
        width={300}
      />
        : 
      <IAPTextInput placeholder='Palau' onChange={(e) => this.props.updateUploadInfo('location', e.target.value)} />

    return (
      <div className='LocationEnter'>
        {locationEntry}
      </div>
    )
  }
}

LocationEnter.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, undefined]),
      lng: PropTypes.oneOfType([PropTypes.number, undefined])
    }),
    PropTypes.string
  ]).isRequired,
  setUserLocation: PropTypes.func.isRequired,
  updateUploadInfo: PropTypes.func.isRequired
}

export default LocationEnter
