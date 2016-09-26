import React, { PropTypes } from 'react'

class IAPCheckBox extends React.Component {
  render () {
    return (
      <input className='IAPCheckBox' type='checkbox' checked={this.props.checked} />
    )
  }
}

IAPCheckBox.propTypes = {
  checked: PropTypes.bool
}

export default IAPCheckBox
