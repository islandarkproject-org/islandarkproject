import React, { PropTypes } from 'react'

class IAPEmailInput extends React.Component {
	render () {
    return (
      <input
        className='IAPEmailInput'
        type='email'
        placeholder={this.props.placeholder}
        defaultValue={this.props.value}
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
      />
    )
  }
}

IAPEmailInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
}

export default IAPEmailInput
