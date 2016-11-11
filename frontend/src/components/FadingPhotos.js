import React, { PropTypes } from 'react'

class FadingPhotos extends React.Component {
  photoStyle (photoNum, repetitions) {
    return {
      opacity: 1 - (1 / repetitions) * photoNum,
      width: `${100 / repetitions}%`
    }
  }

  render () {
    const photos = []
    for (let i = 0; i < this.props.repetitions; i++) {
      photos.push(
        <img
          key={i}
          src={this.props.photo}
          style={this.photoStyle(i, this.props.repetitions)} />
      )
    }

    return (
      <div className='FadingPhotos'>
        {photos}
      </div>
    )
  }
}

FadingPhotos.propTypes = {
  photo: PropTypes.string.isRequired
}

export default FadingPhotos
