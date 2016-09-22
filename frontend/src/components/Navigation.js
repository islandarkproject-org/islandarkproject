import React from 'react'
import { Link } from 'react-router'
import Button from './Button'
import Logo from './Logo'
import TitleText from './TitleText'
import IoUpload from 'react-icons/lib/io/upload'
import IoEye from 'react-icons/lib/io/eye'
import IoLogIn from 'react-icons/lib/io/log-in'
import IoImages from 'react-icons/lib/io/images'
import IoPersonAdd from 'react-icons/lib/io/person-add'

class Navigation extends React.Component {
  render () {
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
            <button>
              <IoUpload size={25} /> <TitleText>Upload</TitleText>
            </button>
          </li>
          <li>
            <button>
              <IoImages size={25} /> <TitleText>View</TitleText>
            </button>
          </li>
          <li>
            <button>
              <IoLogIn size={25} /> <TitleText>Log In</TitleText>
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
