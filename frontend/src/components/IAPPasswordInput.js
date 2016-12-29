import React, { PropTypes } from 'react'

const IAPPasswordInput = ({placeholder, onChange}) =>
  <input
    className='IAPPasswordInput'
    type='password'
    placeholder={placeholder}
    onChange={onChange} />

IAPPasswordInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default IAPPasswordInput
