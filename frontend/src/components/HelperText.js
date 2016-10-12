import React, { PropTypes } from 'react'

class HelperText extends React.Component {
  render () {
    return (
      <p className='HelperText'>{this.props.children}</p>
    )
  }
}

HelperText.propTypes = {
  children: PropTypes.string.isRequired
}

export default HelperText
