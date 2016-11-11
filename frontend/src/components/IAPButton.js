import React, { PropTypes } from 'react'

const IAPButton = ({onClick, children}) =>
  <button
  	className='IAPButton'
  	type='button'
  	onClick={onClick}>{children}</button>

IAPButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default IAPButton
