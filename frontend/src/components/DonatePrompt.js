import React from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'
import Button from './Button'
import FadingPhotos from './FadingPhotos'

class DonatePrompt extends React.Component {
  render () {
    return (
      <section className='DonatePrompt'>
        <TitleText>Donate To Keep Island Cultures From Fading Away</TitleText>
        <FadingPhotos photos={[
          'https://upload.wikimedia.org/wikipedia/commons/5/55/Maori_dancers.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/5/55/Maori_dancers.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/5/55/Maori_dancers.jpg'
        ]} />
        <BodyText>Your money will go towards the cost of further research and the development of the Island Ark Project technology.</BodyText>
        <Button>Donate Now</Button>
      </section>
    )
  }
}

DonatePrompt.propTypes = {}

export default DonatePrompt
