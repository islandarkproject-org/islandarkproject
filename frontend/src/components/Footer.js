import React from 'react'
import Logo from './Logo'
import BodyText from './BodyText'
import { Link } from 'react-router'

class Footer extends React.Component {
  render () {
    let logInDisplay = this.props.userIsLoggedIn ?
      null
        :
      <li>
        <Link to='login'>
          Log In
        </Link>
      </li>

    let registerDisplay = this.props.userIsLoggedIn ?
      null
        :
      <li>
        <Link to='register'>
          Register
        </Link>
      </li>

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
          <li>
            <Link to='view'>
              View
            </Link>
          </li>
          <li>About</li>
          <li>
            <Link to='team'>
              Team
            </Link>
          </li>
          <li>Contact</li>
          {logInDisplay}
          {registerDisplay}
        </ul>
      </footer>
    )
  }
}

Footer.propTypes = {}

export default Footer
