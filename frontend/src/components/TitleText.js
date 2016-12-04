import React, { PropTypes } from 'react'

const TitleText = ({children}) =>
  <h1 className='TitleText'>{children}</h1>

TitleText.propTypes = {
  children: PropTypes.string.isRequired
}

export default TitleText
