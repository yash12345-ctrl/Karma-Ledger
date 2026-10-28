export type SceneNumber = 1 | 2 | 3 | 4 | 5 | 6

export interface SceneMeta {
  number: SceneNumber
  name: string
  subtitle: string
  dialogue: string
  audioSrc: string
}

export const SCENES: SceneMeta[] = [
  {
    number: 1,
    name: "Chitragupta's Record Room",
    subtitle: 'The Sacred Hall of Cosmic Ledgers',
    dialogue: 'Namaste! I am Chitragupta, and my scroll is a mess!',
    audioSrc: '/audio/1nf/scene1.mp3',
  },
  {
    number: 2,
    name: 'The Messy Database',
    subtitle: 'Unnormalized Multi-Valued Chaos',
    dialogue: 'Soul S102, Meera, has three deeds crammed into one record!',
    audioSrc: '/audio/1nf/scene2.mp3',
  },
  {
    number: 3,
    name: 'Magical 1NF Transformation',
    subtitle: 'The Atomicity Miracle of Sage Agastya',
    dialogue: 'First Normal Form says every cell holds one atomic value!',
    audioSrc: '/audio/1nf/scene3.mp3',
  },
  {
    number: 4,
    name: 'The Language Problem',
    subtitle: 'Why Comma-Separated Strings Break Queries',
    dialogue: 'Table C is just as bad, with Tamil, English in a single cell.',
    audioSrc: '/audio/1nf/scene4.mp3',
  },
  {
    number: 5,
    name: 'Repair the Scroll',
    subtitle: 'Interactive Atomizer Challenge',
    dialogue: 'Can you help me repair this scroll?',
    audioSrc: '/audio/1nf/scene5.mp3',
  },
  {
    number: 6,
    name: 'The Divine Victory',
    subtitle: '1NF Achieved: Yamaloka Approved',
    dialogue: 'My records are atomic now, so please judge them!',
    audioSrc: '/audio/1nf/scene6.mp3',
  },
]

export interface SoulRecord {
  soulId: string
  name: string
  deeds: string[]
  destination: 'HEAVEN' | 'HELL'
}

export const MESSY_DEEDS_DATA: SoulRecord[] = [
  {
    soulId: 'S101',
    name: 'Ramesh Kumar',
    deeds: ['Donated food to 1,000 pilgrims'],
    destination: 'HEAVEN',
  },
  {
    soulId: 'S102',
    name: 'Meera Bai',
    deeds: ['Saved wounded deer in forest', 'Fed hungry orphan children', 'Dug freshwater village pond'],
    destination: 'HEAVEN',
  },
  {
    soulId: 'S103',
    name: 'Harish Verma',
    deeds: ['Planted sacred banyan grove'],
    destination: 'HEAVEN',
  },
]

export interface LanguageRecord {
  soulId: string
  name: string
  languages: string[]
  karmaPoints: number
}

export const LANGUAGE_PROBLEM_DATA: LanguageRecord = {
  soulId: 'S105',
  name: 'Ananya Sharma',
  languages: ['Tamil', 'English', 'Sanskrit'],
  karmaPoints: 850,
}

export interface MiniGameSource {
  soulId: string
  name: string
  deedList: string[]
}

export const MINI_GAME_CHALLENGE: MiniGameSource = {
  soulId: 'S108',
  name: 'Devendra Nath',
  deedList: [
    'Built shelter for freezing travelers',
    'Distributed herbal medicine during plague',
    'Taught village children ancient scriptures',
  ],
}
