import React from 'react'
import Logo from './Logo'
import BodyText from './BodyText'
import { Link } from 'react-router'

class Footer extends React.Component {
  render () {
    return (
      <footer className='Footer'>
        <div className='brand'>
          <Logo />
          <BodyText>Island Ark Project</BodyText>
        </div>
        <ul>
          <li>
            <Link to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link to='upload'>
              Upload
            </Link>
          </li>
          <li>View</li>
          <li>About</li>
          <li>
            <Link to='team'>
              Team
            </Link>
          </li>
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
