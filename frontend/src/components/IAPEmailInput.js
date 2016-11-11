import React, { PropTypes } from 'react'

const IAPEmailInput = ({placeholder, value, onChange, onFocus}) =>
  <input
    className='IAPEmailInput'
    type='email'
    placeholder={placeholder}
    defaultValue={value}
    onChange={onChange}
    onFocus={onFocus} />

IAPEmailInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
}

export default IAPEmailInput
