import React, { PropTypes } from 'react'

class FadingPhotos extends React.Component {
  render () {
    let PhotoStyle = (photoNum, total) => (
      {
        opacity: 1 - (1 / total) * photoNum,
        width: (100 / total) + '%'
      }
    )

    let photos = this.props.photos.map((photo, i, photos) => <img key={i} src={photo} style={PhotoStyle(i, photos.length)} />)

    return (
      <div className='FadingPhotos'>
        {photos}
      </div>
    )
  }
}

FadingPhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default FadingPhotos
