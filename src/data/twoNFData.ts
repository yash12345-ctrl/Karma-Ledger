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
    name: "Yamraj's Court",
    subtitle: "Welcome to Yamraj's Court ⚖️",
    dialogue: "Even I judge fairly. But let us examine these records more carefully!",
  },
  {
    number: 2,
    name: "Partial Dependency",
    subtitle: "Discover the Partial Dependency 🔍",
    dialogue: "Look at the key (SoulID, DeedNo). SoulName and BirthCity depend only on SoulID, not on the whole key. That is a partial dependency!",
  },
  {
    number: 3,
    name: "Data Anomalies",
    subtitle: "The Curse of Data Anomalies 💥",
    dialogue: "Rohan has one deed, so if it is deleted, we forget he exists! And we cannot register a new soul with no deed!",
  },
  {
    number: 4,
    name: "Splitting the Table",
    subtitle: "Yamraj Splits the Database ⚡",
    dialogue: "Second Normal Form removes partial dependencies. SOUL is split off, and DEED keeps the rest!",
  },
  {
    number: 5,
    name: "Audience Challenge",
    subtitle: "The Audience Becomes the Judge 🎮",
    dialogue: "Can you help Yamraj separate the soul details from the deed details?",
  },
  {
    number: 6,
    name: "Transition to 3NF",
    subtitle: "Transition to Third Normal Form 🌌",
    dialogue: "Sage Bhrigu, tell me what other problems remain!",
  },
]

export interface LedgerRow {
  soulId: string
  deedNo: number
  soulName: string
  birthCity: string
  karmaType: string
}

export const ORIGINAL_LEDGER: LedgerRow[] = [
  { soulId: 'S101', deedNo: 1, soulName: 'Rohan', birthCity: 'Delhi', karmaType: 'Theft' },
  { soulId: 'S101', deedNo: 2, soulName: 'Rohan', birthCity: 'Delhi', karmaType: 'Lying' },
  { soulId: 'S102', deedNo: 1, soulName: 'Meera', birthCity: 'Mumbai', karmaType: 'Cheating' },
]

export const SOUL_TABLE_DATA = [
  { soulId: 'S101', soulName: 'Rohan', birthCity: 'Delhi' },
  { soulId: 'S102', soulName: 'Meera', birthCity: 'Mumbai' },
]

export const DEED_TABLE_DATA = [
  { soulId: 'S101', deedNo: 1, karmaType: 'Theft' },
  { soulId: 'S101', deedNo: 2, karmaType: 'Lying' },
  { soulId: 'S102', deedNo: 1, karmaType: 'Cheating' },
]

export interface MiniGameCard {
  id: string
  label: string
  type: 'soul' | 'deed' | 'both'
  description: string
}

export const CHALLENGE_ATTRIBUTES: MiniGameCard[] = [
  { id: 'SoulID', label: 'SoulID', type: 'both', description: 'Primary Key in SOUL & Foreign Key in DEED' },
  { id: 'DeedNo', label: 'DeedNo', type: 'deed', description: 'Composite Key component for deeds' },
  { id: 'SoulName', label: 'SoulName', type: 'soul', description: 'Personal detail dependent only on SoulID' },
  { id: 'BirthCity', label: 'BirthCity', type: 'soul', description: 'Personal detail dependent only on SoulID' },
  { id: 'KarmaType', label: 'KarmaType', type: 'deed', description: 'Action dependent on specific deed' },
]

export const TRANSITIVE_3NF_PREVIEW = [
  { karmaType: 'Theft', consequence: '100 Years Asura', realm: 'Raurava Hell' },
  { karmaType: 'Lying', consequence: 'Tongue Scorched', realm: 'Kumbhipaka Hell' },
  { karmaType: 'Charity', consequence: 'Golden Chariot', realm: 'Svarga Heaven' },
]
