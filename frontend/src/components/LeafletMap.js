import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class LeafletMap extends React.Component {
  componentDidMount () {
    const mapDOMNode = ReactDOM.findDOMNode(this)
    const map = L.map(mapDOMNode, {
      center: [this.props.location.lat, this.props.location.lng],
      zoom: 13,
      attributionControl: false,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      ]
    })
  }

  render () {
    let style = {
      border: '1px solid black',
      height: '300px',
      width: '300px'
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
  }).isRequired
}

export default LeafletMap
