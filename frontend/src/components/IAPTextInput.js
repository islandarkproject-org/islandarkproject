import React, { PropTypes } from 'react'

class IAPTextInput extends React.Component {
  render () {
    return (
      <input className='IAPTextInput' type='text' placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.props.onChange} />
    )
  }
}

IAPTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default IAPTextInput
