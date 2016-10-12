import React, { PropTypes } from 'react'

class IAPButton extends React.Component {
  render () {
    return (
      <button className='IAPButton' type='button'>{this.props.children}</button>
    )
  }
}

IAPButton.propTypes = {
  children: PropTypes.string
}

export default IAPButton
