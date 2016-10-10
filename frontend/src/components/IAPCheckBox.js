import React, { PropTypes } from 'react'

class IAPCheckBox extends React.Component {
  render () {
    return (
      <input className='IAPCheckBox' type='checkbox' checked={this.props.checked} onClick={this.props.onClick} />
    )
  }
}

IAPCheckBox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default IAPCheckBox
