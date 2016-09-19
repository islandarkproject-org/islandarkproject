import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import Button from './Button'
import { Link } from 'react-router'

class Splash extends React.Component {

  render () {
    let backgroundImgStyle = {
      background: `url(${this.props.img}) no-repeat center center fixed`,
      backgroundSize: 'cover',
    }

    return (
      <div className='Splash' style={backgroundImgStyle}>
        <TitleText>{this.props.title}</TitleText>
        <BodyText extraClasses={['tagline']}>{this.props.tagline}</BodyText>
        <Link to='/upload'>
          <Button>{this.props.callToAction}</Button>
        </Link>
      </div>
    )
  }
}

Splash.propTypes = {
  callToAction: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string
}

export default Splash

