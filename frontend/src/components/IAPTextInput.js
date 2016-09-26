import React, { PropTypes } from 'react'

class IAPTextInput extends React.Component {
  render () {
    return (
      <input className='IAPTextInput' type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} />
    )
  }
}

IAPTextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default IAPTextInput
