import { connect } from 'react-redux'
import Navigation from '../components/Navigation'
import { logOut } from '../actions'

const mapStateToProps = (state) => {
  return {
    userIsLoggedIn: state.userIsLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  }
}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default NavigationContainer
