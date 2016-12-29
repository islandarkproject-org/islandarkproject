import React, { PropTypes } from 'react'

const IAPCheckBox = ({checked, onClick}) =>
  <input
    className='IAPCheckBox'
    type='checkbox'
    checked={checked}
    onClick={onClick} />

IAPCheckBox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default IAPCheckBox
