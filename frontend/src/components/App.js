import React, { PropTypes } from 'react'
import NavigationContainer from '../containers/NavigationContainer'
import FooterContainer from '../containers/FooterContainer'

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
