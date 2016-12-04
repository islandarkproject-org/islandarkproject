import React, { PropTypes } from 'react'

const OverlayIndicator = ({children}) =>
  <div className='OverlayIndicator'>
    {children}
  </div>

OverlayIndicator.propTypes = {
  children: PropTypes.string.isRequired
}

export default OverlayIndicator
