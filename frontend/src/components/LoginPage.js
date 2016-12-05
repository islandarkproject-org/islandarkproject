import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPTextInput from './IAPTextInput'
import IAPPasswordInput from './IAPPasswordInput'
import IAPButton from './IAPButton'

class LoginPage extends React.Component {
  constructor () {
    super()
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleOnChange (e, field) {
    return this.props.updateLoginDetails(field, e.target.value)
  }

  handleLogin (details) {
    return this.props.logIn(details)
  }

  render () {
    return (
      <section className='LoginPage'>
        <TitleText>Login</TitleText>
        <BodyText>Login with your username and password.</BodyText>
        <form>
          <label>
            <BodyText>Username</BodyText>
            <IAPTextInput
              placeholder='Enter your username'
              onChange={(e) => this.handleOnChange(e, 'username')} />
          </label>
          <label>
            <BodyText>Password</BodyText>
            <IAPPasswordInput
              placeholder='Enter your password'
              onChange={(e) => this.handleOnChange(e, 'password')} />
          </label>
          <IAPButton onClick={(e) => this.handleLogin(this.props.loginDetails)}>Login</IAPButton>
        </form>
      </section>
    )
  }
}

LoginPage.propTypes = {
  logIn: PropTypes.func.isRequired,
  loginDetails: PropTypes.shape({
    password: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  updateLoginDetails: PropTypes.func.isRequired
}

export default LoginPage
