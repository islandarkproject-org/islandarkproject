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
        <IAPTextInput placeholder='Enter your username or email address' />
        <IAPPasswordInput placeholder='Enter your password' />
      </section>
    )
  }
}

LoginPage.propTypes = {

}

export default LoginPage
