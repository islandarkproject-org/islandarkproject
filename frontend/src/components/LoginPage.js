import React from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPTextInput from './IAPTextInput'
import IAPPasswordInput from './IAPPasswordInput'

class LoginPage extends React.Component {
  render () {
    return (
      <section className='LoginPage'>
        <TitleText>Login</TitleText>
        <BodyText>Login with your username and password.</BodyText>
        <label>
          <BodyText>Username</BodyText>
          <IAPTextInput placeholder='Enter your username' onChange={(e) => e} />
        </label>
        <label>
          <BodyText>Password</BodyText>
          <IAPPasswordInput placeholder='Enter your password' onChange={(e) => e} />
        </label>
      </section>
    )
  }
}

LoginPage.propTypes = {

}

export default LoginPage
