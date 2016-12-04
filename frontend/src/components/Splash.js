import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPButton from './IAPButton'
import { Link } from 'react-router'

const Splash = ({img, color, title, tagline, callToAction}) => {
  const backgroundImgStyle = {
    background: img ? `url(${img}) no-repeat center center fixed` : color,
    backgroundSize: 'cover',
  }

  return (
    <div className='Splash' style={backgroundImgStyle}>
      <TitleText>{title}</TitleText>
      <BodyText extraClasses={['tagline']}>{tagline}</BodyText>
      <Link to='/upload'>
        <IAPButton>{callToAction}</IAPButton>
      </Link>
    </div>
  )
}

Splash.propTypes = {
  callToAction: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  color: PropTypes.string
}

export default Splash

