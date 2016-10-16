import { connect } from 'react-redux'
import { updateLoginDetails } from '../actions'
import LoginPage from '../components/LoginPage'

const mapStateToProps = (state) => {
  return {
    logInDetails: state.logInDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginDetails: (field, value) => dispatch(updateLoginDetails(field, value))
  }
}

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginPageContainer
