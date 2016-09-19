import React, { PropTypes } from 'react'

class BodyText extends React.Component {
  render () {
    let extraClasses = this.props.extraClasses ? ' ' + this.props.extraClasses.join(' ') : ''
    return (
      <p className={'BodyText' + extraClasses}>{this.props.children}</p>
    )
  }
}

BodyText.propTypes = {
  children: PropTypes.string.isRequired,
  extraClasses: PropTypes.arrayOf(PropTypes.string)
}

export default BodyText
