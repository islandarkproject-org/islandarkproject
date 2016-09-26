import React, { PropTypes } from 'react'

class IAPTextInput extends React.Component {
  render () {
    return (
      <input className='IAPTextInput' type='text' placeholder={this.props.placeholder} value={this.props.value} />
    )
  }
}

IAPTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default IAPTextInput
