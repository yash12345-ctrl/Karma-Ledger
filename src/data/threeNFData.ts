export type SceneNumber = 1 | 2 | 3 | 4 | 5 | 6

export interface SceneMeta {
  number: SceneNumber
  name: string
  subtitle: string
  dialogue: string
}

export const SCENES: SceneMeta[] = [
  {
    number: 1,
    name: "Bhrigu's Observatory",
    subtitle: "Welcome to Sage Bhrigu's Celestial Observatory 🔭",
    dialogue: "Welcome to my celestial observatory! Yamraj resolved partial dependencies, but behold: a hidden transitive curse lurks in the deed records!",
  },
  {
    number: 2,
    name: "Transitive Dependency",
    subtitle: "Discover the Transitive Dependency 🔍",
    dialogue: "Behold the constellation! (SoulID, DeedNo) determines KarmaType, but KarmaType determines Consequence and Realm! Non-key determines non-key — that is a Transitive Dependency!",
  },
  {
    number: 3,
    name: "Curse of Repeated Rules",
    subtitle: "The Curse of Repeated Karma Rules 💥",
    dialogue: "Hot-sand walk, 7 days, is repeated on every Theft row. Change it, and you must edit many rows! Add a new sin type like Cruelty, and you need a deed first!",
  },
  {
    number: 4,
    name: "Breaking the Chain",
    subtitle: "Sage Bhrigu Breaks the Dependency Chain ⚡",
    dialogue: "Third Normal Form removes transitive dependencies involving non-key attributes. I move these rules into KARMA_RULE, so each karma type is stored in one place!",
  },
  {
    number: 5,
    name: "Become the Sage",
    subtitle: "The Audience Becomes the Sage 🎮",
    dialogue: "A new karma rule has arrived. Where should each attribute be stored? Drag and drop the cards into DEED and KARMA_RULE!",
  },
  {
    number: 6,
    name: "Transition to BCNF",
    subtitle: "Transition to Boyce-Codd Normal Form 🌌",
    dialogue: "Narayan, Narayan! Sage Narada, I hear gossip about Table B!",
  },
]

export interface UnnormalizedDeedRow {
  soulId: string
  deedNo: number
  karmaType: string
  deedNature: string
  consequence: string
  realm: string
}

export const UNNORMALIZED_DEED_DATA: UnnormalizedDeedRow[] = [
  {
    soulId: 'S101',
    deedNo: 1,
    karmaType: 'Theft',
    deedNature: 'Stealing',
    consequence: 'Hot-sand walk, 7 days',
    realm: 'Naraka A',
  },
  {
    soulId: 'S101',
    deedNo: 2,
    karmaType: 'Lying',
    deedNature: 'False speech',
    consequence: 'Echo chamber, 3 days',
    realm: 'Naraka B',
  },
  {
    soulId: 'S102',
    deedNo: 1,
    karmaType: 'Theft',
    deedNature: 'Stealing',
    consequence: 'Hot-sand walk, 7 days',
    realm: 'Naraka A',
  },
]

export interface KarmaRuleRow {
  karmaType: string
  deedNature: string
  consequence: string
  realm: string
}

export const KARMA_RULE_DATA: KarmaRuleRow[] = [
  {
    karmaType: 'Theft',
    deedNature: 'Stealing',
    consequence: 'Hot-sand walk, 7 days',
    realm: 'Naraka A',
  },
  {
    karmaType: 'Lying',
    deedNature: 'False speech',
    consequence: 'Echo chamber, 3 days',
    realm: 'Naraka B',
  },
  {
    karmaType: 'Cruelty',
    deedNature: 'Causing suffering',
    consequence: 'Iron chamber, 10 days',
    realm: 'Naraka C',
  },
]

export interface CleanDeedRow {
  soulId: string
  deedNo: number
  karmaType: string
}

export const CLEAN_DEED_DATA: CleanDeedRow[] = [
  { soulId: 'S101', deedNo: 1, karmaType: 'Theft' },
  { soulId: 'S101', deedNo: 2, karmaType: 'Lying' },
  { soulId: 'S102', deedNo: 1, karmaType: 'Theft' },
]

export interface ChallengeCard {
  id: string
  label: string
  description: string
  target: 'deed' | 'rule' | 'both'
}

export const CHALLENGE_CARDS: ChallengeCard[] = [
  { id: 'SoulID', label: 'SoulID', description: 'Composite key identifier for deeds', target: 'deed' },
  { id: 'DeedNo', label: 'DeedNo', description: 'Composite key identifier for deeds', target: 'deed' },
  { id: 'KarmaType', label: 'KarmaType', description: 'Reference in DEED & Primary Key in KARMA_RULE', target: 'both' },
  { id: 'DeedNature', label: 'DeedNature', description: 'Intrinsic characteristic of karma type', target: 'rule' },
  { id: 'Consequence', label: 'Consequence', description: 'Penal punishment for karma type', target: 'rule' },
  { id: 'Realm', label: 'Realm', description: 'Destination realm determined by consequence', target: 'rule' },
]

export const BCNF_PREVIEW_DATA = [
  { judge: 'Dharma-Raja', court: 'Chamber 1', caseType: 'Sinful Deeds' },
  { judge: 'Yama-Duta', court: 'Chamber 2', caseType: 'Minor Sins' },
  { judge: 'Chitragupta', court: 'Chamber 1', caseType: 'Record Keeping' },
]
