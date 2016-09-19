import React, { PropTypes } from 'react'

class BackgroundPhoto extends React.Component {
  render () {
    let BackgroundPhotoStyle = {
      opacity: this.props.opacity,
      width: this.props.photoWidth
    }

    return (
      <div className='BackgroundPhoto'>
        <img src={this.props.photo} style={BackgroundPhotoStyle} />
      </div>
    )
  }
}

BackgroundPhoto.PropTypes = {
  photo: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired
}

export default BackgroundPhoto
