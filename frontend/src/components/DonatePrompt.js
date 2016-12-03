import React from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPButton from './IAPButton'

const DonatePrompt = () =>
  <section className='DonatePrompt'>
    <TitleText>Donate To Keep Island Cultures From Fading Away</TitleText>
    <BodyText>Your money will go towards the cost of further research and the development of the Island Ark Project technology.</BodyText>
    <IAPButton>Donate Now</IAPButton>
  </section>

DonatePrompt.propTypes = {}

export default DonatePrompt
