import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class LeafletMap extends React.Component {
  constructor () {
    super()
    this.map
    this.marker
  }

  componentDidMount () {
    const mapDOMNode = ReactDOM.findDOMNode(this)
    const coords = [this.props.location.lat, this.props.location.lng]
    this.map = L.map(mapDOMNode, {
      center: coords,
      zoom: 10,
      attributionControl: false,
      layers: [
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png')
      ]
    })

    this.marker = L.marker(coords).addTo(this.map)

    if (this.props.onMapClick) {
      this.map.on('click', this.props.onMapClick)
    }
  }

  componentDidUpdate () {
    const coords = [this.props.location.lat, this.props.location.lng]
    this.marker.setLatLng(coords)
  }

  render () {
    let style = {
      border: '1px solid black',
      height: `${this.props.height}px`,
      width: `${this.props.width}px`
    }

    return (
      <div className='LeafletMap' style={style}></div>
    )
  }
}

LeafletMap.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, undefined]),
    lng: PropTypes.oneOfType([PropTypes.number, undefined])
  }).isRequired,
  onMapClick: PropTypes.func
}

export default LeafletMap
