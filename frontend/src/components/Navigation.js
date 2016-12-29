import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Logo from './Logo'
import TitleText from './TitleText'
import IoUpload from 'react-icons/lib/io/upload'
import IoLogIn from 'react-icons/lib/io/log-in'
import IoLogOut from 'react-icons/lib/io/log-out'
import IoImages from 'react-icons/lib/io/images'

const Navigation = ({userIsLoggedIn, logOut}) => {
  const logInOrOut = userIsLoggedIn ?
    <button onClick={logOut}>
      <IoLogOut size={25} /> <TitleText>Log Out</TitleText>
    </button>
      :
    <Link to='login'>
      <button>
        <IoLogIn size={25} /> <TitleText>Log In</TitleText>
      </button>
    </Link>

  return (
    <nav className='Navigation'>
      <ul className='logo-root'>
        <li>
          <Link to='/'>
            <Logo />
          </Link>
        </li>
      </ul>
      <ul className='links'>
        <li>
          <Link to='upload'>
            <button>
              <IoUpload size={25} /> <TitleText>Upload</TitleText>
            </button>
          </Link>
        </li>
        <li>
          <Link to='view'>
            <button>
              <IoImages size={25} /> <TitleText>View</TitleText>
            </button>
          </Link>
        </li>
        <li>
          {logInOrOut}
        </li>
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  userIsLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func
}

export default Navigation
