import { connect } from 'react-redux'
import Footer from '../components/Footer'

const mapStateToProps = (state) => {
  return {
    userIsLoggedIn: state.userIsLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default FooterContainer
