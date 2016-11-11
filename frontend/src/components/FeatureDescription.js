import React, { PropTypes } from 'react'
import BodyText from './BodyText'
import TitleText from './TitleText'
import Logo from './Logo'
import IoPaperclip from 'react-icons/lib/io/paperclip'
import IoCloud from 'react-icons/lib/io/cloud'
import IoChatboxes from 'react-icons/lib/io/chatboxes'
import IoLockCombination from 'react-icons/lib/io/lock-combination'

const FeatureDescription = () =>
  <section className='FeatureDescription'>
    <Logo />
    <TitleText>Island Ark Project Features</TitleText>
    <ul>
      <li>
        <IoPaperclip size={60} />
        <TitleText>Upload Anything</TitleText>
        <BodyText>Text, images, video and audio. Any cultural artefact.</BodyText>
      </li>
      <li>
        <IoCloud size={60} />
        <TitleText>Access Anywhere</TitleText>
        <BodyText>And on any device. From mobile to desktop and North to South.</BodyText>
      </li>
      <li>
        <IoChatboxes size={60} />
        <TitleText>Discuss and Debate</TitleText>
        <BodyText>Keep culture alive by adding context and comments.</BodyText>
      </li>
      <li>
        <IoLockCombination size={60} />
        <TitleText>Keep It a Secret</TitleText>
        <BodyText>Private content option for families and communities.</BodyText>
      </li>
    </ul>
  </section>

FeatureDescription.PropTypes = {}

export default FeatureDescription
