import React from 'react'
import Navigation from './Navigation'
import LandingPage from './LandingPage'
import Footer from './Footer'
import Uploader from './Uploader'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
        <LandingPage />
        <Footer />
        <Uploader />
      </div>
    )
  }
}

export default App
