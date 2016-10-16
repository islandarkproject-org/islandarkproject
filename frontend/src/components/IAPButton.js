import React, { PropTypes } from 'react'

class IAPButton extends React.Component {
  render () {
    return (
      <button className='IAPButton' type='button' onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}

IAPButton.propTypes = {
  children: PropTypes.string.isRequired
}

export default IAPButton
