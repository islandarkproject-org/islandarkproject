import React, { PropTypes } from 'react'

class IAPPasswordInput extends React.Component {
  render () {
    return (
      <input className='IAPPasswordInput' type='password' placeholder={this.props.placeholder} onChange={this.props.onChange} />
    )
  }
}

IAPPasswordInput.propTypes = {
  placeholder: PropTypes.string
}

export default IAPPasswordInput
