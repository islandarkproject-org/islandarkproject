import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPTextInput from './IAPTextInput'
import IAPPasswordInput from './IAPPasswordInput'
import IAPEmailInput from './IAPEmailInput'
import IAPButton from './IAPButton'

class RegisterPage extends React.Component {
	constructor () {
    super()
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (e, field) {
    return this.props.updateRegisterDetails(field, e.target.value)
  }

	render () {
		return (
			<section className='RegisterPage'>
				<TitleText>Register</TitleText>
				<BodyText>Create a new account.</BodyText>
				<form>
					<label>
						<BodyText>Username</BodyText>
						<IAPTextInput
							placeholder='Enter a username'
							onChange={(e) => this.handleOnChange(e, 'username')}
						/>
					</label>
					<label>
						<BodyText>Password</BodyText>
						<IAPPasswordInput
							placeholder='Enter a password'
							onChange={(e) => this.handleOnChange(e, 'password')}
						/>
					</label>
					<label>
						<BodyText>Confirm Password</BodyText>
						<IAPPasswordInput
							placeholder='Confirm your password'
							onChange={(e) => this.handleOnChange(e, 'confirmPassword')}
						/>
					</label>
					<label>
						<BodyText>Email Adress</BodyText>
						<IAPEmailInput
							placeholder='email@example.com'
							onChange={(e) => this.handleOnChange(e, 'email')}
						/>
					</label>
					<label>
						<BodyText>Name</BodyText>
						<IAPTextInput
							placeholder='John Smith'
							onChange={(e) => this.handleOnChange(e, 'fName')}
						/>
					</label>
					<IAPButton
						onClick={(e) => this.props.register(this.props.registerDetails)}
					>
						Register
					</IAPButton>
				</form>
			</section>
		)
	}
}

RegisterPage.propTypes = {
	registerDetails: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		confirmPassword: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	updateRegisterDetails: PropTypes.func.isRequired
}

export default RegisterPage
