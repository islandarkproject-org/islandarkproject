import React from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import IAPButton from './IAPButton'
import FadingPhotos from './FadingPhotos'

const DonatePrompt = () =>
  <section className='DonatePrompt'>
    <TitleText>Donate To Keep Island Cultures From Fading Away</TitleText>
    <FadingPhotos
      photo='https://upload.wikimedia.org/wikipedia/commons/5/55/Maori_dancers.jpg'
      repetitions={3} />
    <BodyText>Your money will go towards the cost of further research and the development of the Island Ark Project technology.</BodyText>
    <IAPButton>Donate Now</IAPButton>
  </section>

DonatePrompt.propTypes = {}

export default DonatePrompt
