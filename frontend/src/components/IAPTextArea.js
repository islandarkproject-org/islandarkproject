import React, { PropTypes } from 'react'

class IAPTextArea extends React.Component {
  render () {
    return (
      <textarea className='IAPTextArea' placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.props.onChange} />
    )
  }
}

IAPTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default IAPTextArea
