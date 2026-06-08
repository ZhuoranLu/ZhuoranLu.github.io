import type { Profile } from '@/types'

export const profile: Profile = {
  name: 'Zhuoran Lu',
  title: 'Senior Research Scientist, Accenture',
  bio: 'Senior Research Scientist\nCenter for Advanced AI, Accenture',
  location: 'Mountain View, California',
  email: 'zhuoranlu33@gmail.com',
  avatar: '/images/headshot_1.png',
  cvUrl: '/images/ZhuoranLu_cv_0608.pdf',
  scholarUrl: 'https://scholar.google.com/citations?user=nWHEpdcAAAAJ',
}

/** Intro paragraphs for the About Me section (rendered with inline-link support). */
export const aboutParagraphs: string[] = [
  'I am a Senior Research Scientist @ Center for Advanced AI, Accenture, working with Dr. [Michelle Zhou](https://scholar.google.com/citations?user=ycSs2QcAAAAJ&hl=en).',
  'I received my Ph.D. in Computer Science at Purdue University, fortunately advised by Prof. [Ming Yin](http://mingyin.org/).',
  "Prior to Purdue, I received my Bachelor's degree in Computer Science and Statistics from the University of Illinois at Urbana-Champaign in 2019, advised by Prof. [Roxana Girju](https://linguistics.illinois.edu/directory/profile/girju) and Prof. [Richard Sowers](http://publish.illinois.edu/r-sowers/).",
]

export const researchIntro: string[] = [
  'My research interests lie at the intersection of HCI and AI, with a focus on human-AI interaction and human-centered AI.',
  'Specifically, my research aims to understand human-AI interaction and design human-centered AI from two perspectives:',
]

export const researchBullets: string[] = [
  "Humans' cognitive process of engaging and collaborating with AI, which potentially has a bias.",
  'Social influence from other information sources beyond AI that shapes how people collaborate with it.',
]

export const researchOutro =
  'I am also broadly interested in applied machine learning, computational social science, crowdsourcing, and behavioral science.'
