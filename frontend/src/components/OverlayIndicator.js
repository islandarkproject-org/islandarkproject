import React, { PropTypes } from 'react'

class OverlayIndicator extends React.Component {
  render () {
    return (
      <div className='OverlayIndicator'>
        {this.props.children}
      </div>
    )
  }
}

OverlayIndicator.propTypes = {
  children: PropTypes.string.isRequired
}

export default OverlayIndicator
