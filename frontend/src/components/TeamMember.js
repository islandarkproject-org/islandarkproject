import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'

const TeamMember = ({imageUrl, name, bio}) =>
  <div className='TeamMember'>
    <TitleText>{name}</TitleText>
    <div className='person-container'>
      <div className='photo-container'>
        <img
          className='team-member-photo'
          src={imageUrl || 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png'}
          alt={name + ' Photo'} />
      </div>
      <div className='bio'>
        <BodyText>
          {bio}
        </BodyText>
      </div>
    </div>
  </div>

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  bio: PropTypes.string
}

export default TeamMember
