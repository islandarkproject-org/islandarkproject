import React, { PropTypes } from 'react'

class TitleText extends React.Component {
  render () {
    return (
      <h1 className='TitleText'>{this.props.children}</h1>
    )
  }
}

TitleText.propTypes = {
  children: PropTypes.string.isRequired
}

export default TitleText
