import React, { PropTypes } from 'react'

const IAPTextArea = ({placeholder, value, onChange}) =>
  <textarea
  	className='IAPTextArea'
  	placeholder={placeholder}
  	defaultValue={value}
  	onChange={onChange} />

IAPTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default IAPTextArea
