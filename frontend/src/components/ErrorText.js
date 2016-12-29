import React, { PropTypes } from 'react'

const ErrorText = ({children}) =>
  <p className='ErrorText'>{children}</p>

ErrorText.propTypes = {
  children: PropTypes.string.isRequired
}

export default ErrorText
