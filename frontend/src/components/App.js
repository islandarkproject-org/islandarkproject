import React, { PropTypes } from 'react'
import NavigationContainer from '../containers/NavigationContainer'
import LandingPage from './LandingPage'
import FooterContainer from '../containers/FooterContainer'
import Uploader from './Uploader'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <NavigationContainer />
        {this.props.children}
        <FooterContainer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
