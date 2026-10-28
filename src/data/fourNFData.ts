export type FourNFSceneNumber = 1 | 2 | 3 | 4 | 5 | 6

export interface FourNFSceneMeta {
  number: FourNFSceneNumber
  name: string
  subtitle: string
  dialogue: string
}

export const FOUR_NF_SCENES: FourNFSceneMeta[] = [
  {
    number: 1,
    name: "Vyasa's Library",
    subtitle: "Enter Sage Vyasa's Ancient Chamber 📜",
    dialogue: "Let us examine Table C! A soul's languages and skills are independent, yet our records combine them unnecessarily.",
  },
  {
    number: 2,
    name: 'Multivalued Dependency',
    subtitle: 'Discover the Multivalued Dependency 🔍',
    dialogue: 'A soul\'s languages and skills are independent. S101 has two languages and two skills, so we store four rows, a full cross product, just to show them.',
  },
  {
    number: 3,
    name: 'Multiplying Rows',
    subtitle: 'The Curse of the Multiplying Rows 💥',
    dialogue: 'Add one language, and you must add a row for every skill! 3 languages × 4 skills explodes into 12 rows!',
  },
  {
    number: 4,
    name: 'Separating Lists',
    subtitle: 'Sage Vyasa Separates the Independent Lists ⚡',
    dialogue: 'Fourth Normal Form splits them: SOUL_LANGUAGE and SOUL_SKILL. The ledger is now clean!',
  },
  {
    number: 5,
    name: 'Become the Sage',
    subtitle: 'The Audience Becomes the Sage 🎮',
    dialogue: 'Can you free the languages and skills from the curse of combinations? Drag each attribute card into the right table!',
  },
  {
    number: 6,
    name: 'The Final Ledger',
    subtitle: 'The Final Ledger — All Normal Forms Complete 🌟',
    dialogue: 'Finally, my scroll is clean! Dhanyavaad, sages. Even Yamraj has no complaints!',
  },
]

export interface TableCRow {
  soulId: string
  language: string
  skill: string
}

export const TABLE_C_INITIAL: TableCRow[] = [
  { soulId: 'S101', language: 'Tamil', skill: 'Singing' },
  { soulId: 'S101', language: 'Tamil', skill: 'Painting' },
  { soulId: 'S101', language: 'English', skill: 'Singing' },
  { soulId: 'S101', language: 'English', skill: 'Painting' },
]

export const TABLE_C_WITH_HINDI: TableCRow[] = [
  ...TABLE_C_INITIAL,
  { soulId: 'S101', language: 'Hindi', skill: 'Singing' },
  { soulId: 'S101', language: 'Hindi', skill: 'Painting' },
]

export const TABLE_C_EXPLOSION_12: TableCRow[] = [
  { soulId: 'S101', language: 'Tamil', skill: 'Singing' },
  { soulId: 'S101', language: 'Tamil', skill: 'Painting' },
  { soulId: 'S101', language: 'Tamil', skill: 'Dancing' },
  { soulId: 'S101', language: 'Tamil', skill: 'Writing' },
  { soulId: 'S101', language: 'English', skill: 'Singing' },
  { soulId: 'S101', language: 'English', skill: 'Painting' },
  { soulId: 'S101', language: 'English', skill: 'Dancing' },
  { soulId: 'S101', language: 'English', skill: 'Writing' },
  { soulId: 'S101', language: 'Hindi', skill: 'Singing' },
  { soulId: 'S101', language: 'Hindi', skill: 'Painting' },
  { soulId: 'S101', language: 'Hindi', skill: 'Dancing' },
  { soulId: 'S101', language: 'Hindi', skill: 'Writing' },
]

export interface SoulLanguageRow {
  soulId: string
  language: string
}

export const SOUL_LANGUAGE_DATA: SoulLanguageRow[] = [
  { soulId: 'S101', language: 'Tamil' },
  { soulId: 'S101', language: 'English' },
  { soulId: 'S101', language: 'Hindi' },
]

export interface SoulSkillRow {
  soulId: string
  skill: string
}

export const SOUL_SKILL_DATA: SoulSkillRow[] = [
  { soulId: 'S101', skill: 'Singing' },
  { soulId: 'S101', skill: 'Painting' },
  { soulId: 'S101', skill: 'Dancing' },
  { soulId: 'S101', skill: 'Writing' },
]

export interface ChallengeCard4NF {
  id: string
  name: string
  type: 'language' | 'skill'
}

export const CHALLENGE_CARDS_4NF: ChallengeCard4NF[] = [
  { id: 'tamil', name: 'Tamil', type: 'language' },
  { id: 'english', name: 'English', type: 'language' },
  { id: 'hindi', name: 'Hindi', type: 'language' },
  { id: 'singing', name: 'Singing', type: 'skill' },
  { id: 'painting', name: 'Painting', type: 'skill' },
  { id: 'dancing', name: 'Dancing', type: 'skill' },
]
