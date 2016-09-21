import React, { PropTypes } from 'react'
import Navigation from './Navigation'
import LandingPage from './LandingPage'
import Footer from './Footer'
import Uploader from './Uploader'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
