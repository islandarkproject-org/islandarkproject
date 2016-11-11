import React, { PropTypes } from 'react'

const BackgroundPhoto = ({photo, opacity, photoWidth}) =>
  <div className='BackgroundPhoto'>
    <img
      src={photo}
      style={{opacity, width: photoWidth}} />
  </div>

BackgroundPhoto.PropTypes = {
  opacity: PropTypes.string,
  photoWidth: PropTypes.string,
  photo: PropTypes.string.isRequired
}

export default BackgroundPhoto
