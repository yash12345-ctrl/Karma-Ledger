export type BCNFSceneNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface BCNFSceneMeta {
  number: BCNFSceneNumber
  name: string
  subtitle: string
  dialogue: string
}

export const BCNF_SCENES: BCNFSceneMeta[] = [
  {
    number: 1,
    name: 'Divine Gossip',
    subtitle: 'Narada Arrives with Divine Gossip 🪕',
    dialogue: 'Narayan, Narayan! The gossip is true. Let us see what is wrong with Table B in the Celestial Court Administration Office!',
  },
  {
    number: 2,
    name: 'Court Mystery',
    subtitle: 'Investigate the Court Assignment Mystery 🔍',
    dialogue: 'In COURT_ASSIGNMENT, Judge determines Court, since each judge sits in one court only. But Judge is not a superkey! Click Judge to investigate!',
  },
  {
    number: 3,
    name: '3NF vs BCNF',
    subtitle: "The BCNF Mystery — Why 3NF Isn't Enough ⚖️",
    dialogue: 'It still passes 3NF, because Court is part of a candidate key. But BCNF demands more: every determinant must be a superkey!',
  },
  {
    number: 4,
    name: 'Deletion Anomaly',
    subtitle: "The Deletion Anomaly — A Court's Secret Disappears 💥",
    dialogue: 'The anomaly: if S101 is dropped, we may lose the fact that Ila serves Dana Court! Watch the court record vanish!',
  },
  {
    number: 5,
    name: 'BCNF Transformation',
    subtitle: 'The Magical BCNF Transformation ⚡',
    dialogue: 'So we split into JUDGE(Judge, Court) and SOUL_JUDGE(SoulID, Judge). Now, the judge-to-court relationship is stored separately!',
  },
  {
    number: 6,
    name: 'Become Investigator',
    subtitle: 'The Audience Becomes the Investigator 🎮',
    dialogue: 'Test your wisdom! Can you identify which functional dependency breaks BCNF and why?',
  },
  {
    number: 7,
    name: 'Transition to 4NF',
    subtitle: 'Transition to Fourth Normal Form 🌌',
    dialogue: 'Sage Vyasa, do you have anything left for Table C? Behold multi-valued dependencies multiplying in the cosmic registry!',
  },
]

export interface CourtAssignmentRow {
  soulId: string
  court: string
  judge: string
}

export const COURT_ASSIGNMENT_DATA: CourtAssignmentRow[] = [
  { soulId: 'S101', court: 'Dana Court', judge: 'Ila' },
  { soulId: 'S101', court: 'Justice Court', judge: 'Ravi' },
  { soulId: 'S102', court: 'Dana Court', judge: 'Ila' },
  { soulId: 'S103', court: 'Justice Court', judge: 'Ravi' },
]

export interface DeletionAnomalyRow {
  soulId: string
  court: string
  judge: string
  isCrucialTarget?: boolean
}

export const DELETION_ANOMALY_DEMO: DeletionAnomalyRow[] = [
  { soulId: 'S101', court: 'Dana Court', judge: 'Ila', isCrucialTarget: true },
  { soulId: 'S102', court: 'Justice Court', judge: 'Ravi' },
  { soulId: 'S104', court: 'Mercy Court', judge: 'Karna' },
]

export interface DecomposedJudgeRow {
  judge: string
  court: string
}

export const DECOMPOSED_JUDGE_DATA: DecomposedJudgeRow[] = [
  { judge: 'Ila', court: 'Dana Court' },
  { judge: 'Ravi', court: 'Justice Court' },
]

export interface DecomposedSoulJudgeRow {
  soulId: string
  judge: string
}

export const DECOMPOSED_SOUL_JUDGE_DATA: DecomposedSoulJudgeRow[] = [
  { soulId: 'S101', judge: 'Ila' },
  { soulId: 'S101', judge: 'Ravi' },
  { soulId: 'S102', judge: 'Ila' },
  { soulId: 'S103', judge: 'Ravi' },
]

export interface MultiValuedPreviewRow {
  soulId: string
  language: string
  skill: string
}

export const FOUR_NF_PREVIEW_DATA: MultiValuedPreviewRow[] = [
  { soulId: 'S101', language: 'Sanskrit', skill: 'Astral Projection' },
  { soulId: 'S101', language: 'Sanskrit', skill: 'Karmic Divination' },
  { soulId: 'S101', language: 'Tamil', skill: 'Astral Projection' },
  { soulId: 'S101', language: 'Tamil', skill: 'Karmic Divination' },
]
