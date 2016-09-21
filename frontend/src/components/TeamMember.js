import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'

class TeamMember extends React.Component {
  render () {
    // Replace with placeholder if no image is supplied
    let imageUrl = this.props.imageUrl || 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png'

    return (
      <div className='TeamMember'>
        <TitleText>{this.props.name}</TitleText>
        <img src={this.props.imageUrl} alt={this.props.name} />
        <BodyText>
          {this.props.bio}
        </BodyText>
      </div>
    )
  }
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  bio: PropTypes.string
}

export default TeamMember
