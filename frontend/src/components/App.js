import React, { PropTypes } from 'react'
import NavigationContainer from '../containers/NavigationContainer'
import LandingPage from './LandingPage'
import FooterContainer from '../containers/FooterContainer'
import Uploader from './Uploader'

const App = ({children}) =>
  <div className='App'>
    <NavigationContainer />
    {children}
    <FooterContainer />
  </div>

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
