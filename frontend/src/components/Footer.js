import React from 'react'
import Logo from './Logo'
import BodyText from './BodyText'

class Footer extends React.Component {
  render () {
    return (
      <footer className='Footer'>
        <div className='brand'>
          <Logo />
          <BodyText>Island Ark Project</BodyText>
        </div>
        <ul>
          <li>Home</li>
          <li>Upload</li>
          <li>View</li>
          <li>About</li>
          <li>Contact</li>
          <li>Log In</li>
          <li>Sign Up</li>
        </ul>
      </footer>
    )
  }
}

Footer.propTypes = {}

export default Footer
