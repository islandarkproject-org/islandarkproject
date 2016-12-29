import { connect } from 'react-redux'
import { logIn, updateLoginDetails } from '../actions'
import LoginPage from '../components/LoginPage'

const mapStateToProps = (state) => {
  return {
    loginDetails: state.loginDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (details) => dispatch(logIn(details)),
    updateLoginDetails: (field, value) => dispatch(updateLoginDetails(field, value))
  }
}

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginPageContainer
