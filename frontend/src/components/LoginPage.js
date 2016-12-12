import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import LoginForm from './LoginForm'

class LoginPage extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (values) {
    console.log(values)
  }

  render () {
    return (
      <section className='LoginPage'>
        <TitleText>Login</TitleText>
        <BodyText>Login with your username and password.</BodyText>
        <LoginForm onSubmit={this.handleSubmit} />
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
