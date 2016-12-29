// ! The team member info should really be loaded from somewhere instead of being supplied here

import React, { PropTypes } from 'react'
import TitleText from './TitleText'
import TeamMember from './TeamMember'

class TeamPage extends React.Component {
  constructor () {
    super()
    this.teamData = [
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/david-eichert-square.jpg',
        'name': 'David Eichert',
        'bio': 'David Eichert is a graduate student at New York University\'s Center for European and Mediterranean Studies and holds a BA with university honors from Brigham Young University. He is primarily interested in international human rights policy. In addition to interning at Harvard University\'s Berkman Center for Internet & Society, he has published various articles on minority rights, refugee issues, and European separatism.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/dennis-redeker-square.jpg',
        'name': 'Dennis Redeker',
        'bio': 'Dennis Redeker is a PhD researcher of Internet Governance at the Bremen International Graduate School of Social Science (BIGSSS), Germany. He holds a BA in Politics, Philosophy and Economics from University College Maastricht and an MA in International Relations from University of Bremen. His professional background combines climate change adaptation policies and digital monitoring tools. In the past, he conducted field research in the Middle East and the South Caucasus related to topics within the field of Internet & Society (including data-driven governance and privacy/surveillance). In early 2016, he went to Palau to conduct research about the feasibility of digital platforms for intangible cultural heritage safeguarding. Dennis currently trains for his first ever half marathon - which he still hopes to run in 2016.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/ingmar-sturm-square.jpg',
        'name': 'Ingmar Sturm',
        'bio': 'Ingmar Sturm received his B.A. in Social Sciences and Philosophy with honors from University College Maastricht and is now a graduate student of International Relations at the University of Bremen. He conducted field research in Jordan which added to his interest in migration. Currently he is devoting his time to teaching refugees with Teach First Deutschland in Bremen.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/sanya-shahrasbi-square.jpg',
        'name': 'Sanya Shahrasbi',
        'bio': 'Sanya Shahrasbi joined the team while interning at the Delegation of Palau to UNESCO in Paris. She holds a B.A. in Integrative Biology and International Area Studies from the University of California, Berkeley. She has extensive work experience in molecular cloning of proteins involved in the photosynthetic chain as an undergraduate researcher at the Niyogi Lab at Berkeley.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/joey-diaz-square.jpg',
        'name': 'Joey Diaz',
        'bio': 'Joey Diaz is a student at Miami Dade College pursuing a Bachelor in Computer Information Systems with a concentration in Mobile Applications. Programming and continuously learning new technologies are his passions. He contributed in a development of a desktop application that enabled the management of an inventory. Currently, he is working in the development of an Android application part of a big project called the Island Ark Project as well as the deployment of a web site to aid in business growth for companies in need of these services around the Miami area.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/kostas-karalas-square.jpg',
        'name': 'Kostas Karalas',
        'bio': 'Konstantinos Karalas received the B.Sc. and M.Sc. degree in Electronic and Computer Engineering from the Technical University of Crete, Chania, Greece in 2013 and 2015, respectively. As part of his M.Sc. research programme he joined the Institute of Computer Science - FORTH, Heraklion, Greece. He is particularly interested in environmental, educational and health care issues.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/emile-paffard-wray-square.jpg',
        'name': 'Emile Paffard-Wray',
        'bio': 'Emile Paffard-Wray is a Junior Web Developer from the UK. He graduated with a BSc in Physical Chemistry, Maths and Statistics from University College London. He\'s currently putting in his 10,000 hours as a developer and is elsewhere interested in artificial intelligence and mixed martial arts.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/ryan-o-donnell-square.png',
        'name': 'Ryan O\'Donnell',
        'bio': 'Ryan O\'Donnell is located in Charleston, SC and  a graduate of The Pennsylvania State University with a B.S. in Security and Risk Analysis and 5 years industry experience. Currently, he is employed by an industry leading Cyber Security vendor specializing in protecting customer\'s data and applications and also has a background in IT Audit and Networking. Ryan hopes he can make a difference by donating his time to a great cause and help spread IT Security awareness. Current hobbies include:playing golf, hanging at home with his dog Charlie and going to the beach.'
      },
      {
        'img': 'https://s3.amazonaws.com/islandarkproject/team-photos/kevin-king-square.png',
        'name': 'Kevin King',
        'bio': 'Kevin King came across Island Ark Project while searching for nonprofit causes to support on Idealist. As a Millennial, I am passionate about providing my services in the form of marketing knowledge to those causes I truly believe are making a difference in the world today. Island Ark Project is just one such nonprofit cause I support by managing the social media accounts. Are you making your mark on the world?'
      }
    ]
  }

  render () {
    let team = this.teamData.map((member, i) =>
      <TeamMember key={i} name={member.name} imageUrl={member.img} bio={member.bio} />
    )

    return (
      <section className='TeamPage'>
        <TitleText>The Team</TitleText>
        <div className='team-members'>
          {team}
        </div>
      </section>
    )
  }
}

TeamPage.propTypes = {}

export default TeamPage
