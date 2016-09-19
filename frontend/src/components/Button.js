import React, { PropTypes } from 'react'

class Button extends React.Component {
  render () {
    return (
      <button className='Button' type='button'>{this.props.children}</button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.string
}

export default Button
