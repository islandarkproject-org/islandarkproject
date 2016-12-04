import React from 'react'
import Splash from './Splash'
import How from './How'
import FeatureDescription from './FeatureDescription'
import DonatePrompt from './DonatePrompt'

const LandingPage = () =>
  <main className='LandingPage'>
    <Splash
      title='Island Ark Project'
      tagline='Digital Preservation of Island Culture'
      callToAction='Get Started' />
    <How />
    <FeatureDescription />
    <DonatePrompt />
  </main>

LandingPage.propTypes = {}

export default LandingPage
