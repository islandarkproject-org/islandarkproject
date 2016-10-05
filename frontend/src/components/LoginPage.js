import React from 'react'
import IAPTextInput from './IAPTextInput'

class LoginPage extends React.Component {
  render () {
    return (
      <section className='LoginPage'>
        <IAPTextInput placeholder='Enter you username or email address' />
        <input type='password' placeholder='Enter your password' />
      </section>
    )
  }
}

LoginPage.propTypes = {

}

export default LoginPage
