import React, { PropTypes } from 'react'

const IAPTextInput = ({placeholder, value, onChange, onFocus}) =>
  <input
    className='IAPTextInput'
    type='text'
    placeholder={placeholder}
    defaultValue={value}
    onChange={onChange}
    onFocus={onFocus} />

IAPTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
}

export default IAPTextInput
