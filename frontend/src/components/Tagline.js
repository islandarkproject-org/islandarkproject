import React, { PropTypes } from 'react'

class Tagline extends React.Component {
  render () {
    return (
      <h3 className='Tagline'>{this.props.children}</h3>
    )
  }
}

Tagline.propTypes = {
  children: PropTypes.string.isRequired
}

export default Tagline
