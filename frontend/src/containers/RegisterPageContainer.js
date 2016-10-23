import { connect } from 'react-redux'
import RegisterPage from '../components/RegisterPage'
import { register, updateRegisterDetails } from '../actions'

const mapStateToProps = (state) => {
	return {
		registerDetails: state.registerDetails
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (details) => dispatch(register(details)),
		updateRegisterDetails: (field, value) => dispatch(updateRegisterDetails(field, value))
	}
}

const RegisterPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterPage)

export default RegisterPageContainer
