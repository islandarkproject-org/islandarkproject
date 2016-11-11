import React, { PropTypes } from 'react'

const HelperText = ({children}) =>
  <p className='HelperText'>{children}</p>

HelperText.propTypes = {
  children: PropTypes.string.isRequired
}

export default HelperText
