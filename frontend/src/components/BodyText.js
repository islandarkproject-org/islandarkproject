import React, { PropTypes } from 'react'

const BodyText = ({children}) =>
  <p className={'BodyText'}>{children}</p>

BodyText.propTypes = {
  children: PropTypes.string.isRequired
}

export default BodyText
