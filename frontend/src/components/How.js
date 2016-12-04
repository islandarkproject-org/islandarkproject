import React from 'react'
import TitleText from './TitleText'
import BodyText from './BodyText'

const How = () =>
  <section className='How'>
    <section className='intro'>
      <div>
        <TitleText>What are the threats to island cultures?</TitleText>
        <BodyText>Climate change is threatening the world's island nations. When islanders migrate in search of better living conditions, they risk losing thousands of years worth of lived cultural practices. This includes "intangible cultural heritage" such as dances, songs, recipes, oral histories, traditional craft knowledge, rituals, and so forth, as well as the cultural context and meaning behind all of these practices.</BodyText>
      </div>
    </section>
    <section className='what-we-do'>
      <div>
        <TitleText>How can intangible cultural heritage be preserved online?</TitleText>
        <BodyText>Important cultural practices are at risk of disappearing forever. To solve this problem, the Island Ark Project is a kind of living time capsule where anyone can upload, discuss, and access culture regardless of where they live. Migrating communities and future generations can continue to access information about immaterial heritage even if individual members lose their physical connection.</BodyText>
      </div>
    </section>
  </section>

export default How
