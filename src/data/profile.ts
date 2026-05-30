import type { Profile } from '@/types'

export const profile: Profile = {
  name: 'Zhuoran Lu',
  title: 'Senior Research Scientist, Accenture',
  bio: 'Senior Research Scientist, Center for Advanced AI, Accenture',
  location: 'West Lafayette, Indiana',
  email: 'lu800@purdue.edu',
  avatar: '/images/lu800.jpg',
  cvUrl: '/images/ZhuoranLu_CV_public_0117.pdf',
  scholarUrl: 'https://scholar.google.com/citations?user=nWHEpdcAAAAJ',
}

/** Intro paragraphs for the About Me section (rendered with inline-link support). */
export const aboutParagraphs: string[] = [
  'I am a Senior Research Scientist @ Center for Advanced AI, Accenture. I received my Ph.D. in Computer Science at Purdue University, fortunately advised by Prof. [Ming Yin](http://mingyin.org/).',
  "Prior to Purdue, I received my Bachelor's degree in Computer Science and Statistics from the University of Illinois at Urbana-Champaign in 2019, advised by Prof. [Roxana Girju](https://linguistics.illinois.edu/directory/profile/girju) and Prof. [Richard Sowers](http://publish.illinois.edu/r-sowers/).",
]

export const researchIntro: string[] = [
  'My research interests are in the intersection of HCI and AI, mainly focusing on human-AI interaction and human-centered AI.',
  'Specifically, my research aims to empower humans to engage more effectively and appropriately with AI, with a focus on the paradigm of **human-AI decision-making**. I understand human-AI interaction and design human-centered AI based on two perspectives:',
]

export const researchBullets: string[] = [
  "Human decision makers' cognitive process of engaging with AI, which potentially has a bias.",
  'Social influence from other information sources in addition to AI.',
]

export const researchOutro =
  'I am also broadly interested in applied machine learning, computational social science, crowdsourcing, and behavioral science.'
