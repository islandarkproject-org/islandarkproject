import React, { PropTypes } from 'react'

const Tagline = ({children}) =>
  <h3 className='Tagline'>{children}</h3>

Tagline.propTypes = {
  children: PropTypes.string.isRequired
}

export default Tagline
