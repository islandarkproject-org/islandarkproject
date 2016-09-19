import React from 'react'
import Splash from './Splash'
import How from './How'
import FeatureDescription from './FeatureDescription'
import DonatePrompt from './DonatePrompt'

class LandingPage extends React.Component {
  render () {
    return (
      <main className='LandingPage'>
        <Splash img='https://hd.unsplash.com/photo-1446426156356-92b664d86b77' title='Island Ark Project' tagline='Digital Preservation of Island Culture' callToAction='Get Started' />
        <How />
        <FeatureDescription />
        <DonatePrompt />
      </main>
    )
  }
}

export default LandingPage
