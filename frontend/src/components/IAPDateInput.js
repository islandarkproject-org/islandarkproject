import React, { PropTypes } from 'react'

const IAPDateInput = ({value, onChange, onFocus}) =>
  <input
    className='IAPDateInput'
    type='date'
    defaultValue={value}
    onChange={onChange}
    onFocus={onFocus} />

IAPDateInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
}

export default IAPDateInput
