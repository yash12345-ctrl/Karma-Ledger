/**
 * ─────────────────────────────────────────────────────────────
 *  INTRO SCENE SCRIPT  –  "The Day the Karma-DB Disappeared"
 * ─────────────────────────────────────────────────────────────
 *
 *  SCENE 1 · TITLE CARD (≈3s)
 *    Black screen, drifting embers.
 *    NARRATOR : "Yamaloka. The Hall of Records."
 *
 *  SCENE 2 · THE HALL (≈6s)
 *    Slow camera push-in on Chitragupta working late at his desk.
 *    NARRATOR : "Chitragupta keeps the deeds of every soul."
 *    CHITRA   : "Just one quick cleanup..."
 *
 *  SCENE 3 · THE LAPTOP (≈9s)
 *    Camera pushes into the laptop screen – a live SQL console.
 *    He types a comment (his INTENT) and then the query (his MISTAKE):
 *        -- Remove soul #4821 from the ledger
 *        DELETE FROM karma_ledger;          <-- no WHERE clause!
 *    NARRATOR : "He forgot the WHERE clause."   (while the mouse moves to RUN)
 *    He ignores the warning and clicks RUN.
 *    Every row vanishes. 12,458,903 -> 0.  The console turns red.
 *
 *  SCENE 4 · THE REACTION (≈3s)
 *    Close-up. Chitragupta realises what he has done.
 *    CHITRA   : "Hey Ram! Where did all the souls go?!"
 *
 *  SCENE 5 · THE WRATH (≈3.5s)
 *    Lightning. Yamaraj storms in.
 *    YAMA     : "Chitragupta!! Where are my souls?!"
 *
 *  SCENE 6 · THE QUEST (≈6s)
 *    Black.  NARRATOR : "Heaven and Hell are in chaos."
 *    NARRATOR : "Only the Sages of Normalization can restore the Karma-DB."
 *    Golden light floods the screen  ->  HOME PAGE.
 */

export type Caption = { speaker: string; text: string; tone?: 'narrator' | 'chitra' | 'yama' }

export const captions = {
  narrator1: {
    speaker: 'Narrator',
    text: 'Chitragupta keeps the deeds of every soul.',
    tone: 'narrator',
  },
  chitra1: {
    speaker: 'Chitragupta',
    text: 'Just one quick cleanup…',
    tone: 'chitra',
  },
  narrator2: {
    speaker: 'Narrator',
    text: 'He forgot the WHERE clause.',
    tone: 'narrator',
  },
  chitra2: {
    speaker: 'Chitragupta',
    text: 'Hey Ram… where did all the souls go?!',
    tone: 'chitra',
  },
  yama: {
    speaker: 'Yamaraj',
    text: 'CHITRAGUPTA!! WHERE ARE MY SOULS?!',
    tone: 'yama',
  },
} satisfies Record<string, Caption>

/** The two lines typed into the SQL console. */
export const queryText = {
  comment: '-- Remove soul #4821 from the ledger',
  statement: 'DELETE FROM karma_ledger;',
}

export const TOTAL_ROWS = 12458903

export type SoulRow = {
  id: number
  name: string
  punya: number
  paap: number
  destination: 'HEAVEN' | 'HELL'
}

/** Rows visible in the results grid before the disaster. */
export const soulRows: SoulRow[] = [
  { id: 4815, name: 'Ramesh Sharma', punya: 912, paap: 41, destination: 'HEAVEN' },
  { id: 4816, name: 'Anita Verma', punya: 604, paap: 188, destination: 'HEAVEN' },
  { id: 4817, name: 'Kabir Singh', punya: 77, paap: 953, destination: 'HELL' },
  { id: 4818, name: 'Meera Nair', punya: 1204, paap: 12, destination: 'HEAVEN' },
  { id: 4819, name: 'Harish Patel', punya: 311, paap: 402, destination: 'HELL' },
  { id: 4820, name: 'Sunita Rao', punya: 745, paap: 96, destination: 'HEAVEN' },
  { id: 4821, name: 'Vikram Joshi', punya: 58, paap: 877, destination: 'HELL' },
  { id: 4822, name: 'Lakshmi Iyer', punya: 998, paap: 23, destination: 'HEAVEN' },
]

export const tables = ['karma_ledger', 'souls', 'deeds', 'soul_queue', 'lookup_sins'] as const

/**
 * VOICE TRACK  (English, neural TTS rendered to /public/audio/intro/<id>.mp3)
 *   narrator  -> en-GB-RyanNeural
 *   chitra    -> en-IN-PrabhatNeural   (Indian-English accent)
 *   yama      -> en-US-GuyNeural, pitch -28Hz, rate -14%, volume +25%
 *
 * To re-voice a line, edit the text here and re-render the matching mp3 with:
 *   edge-tts --voice <voice> --text "<text>" --write-media public/audio/intro/<id>.mp3
 */
export const voiceLines = {
  title: { who: 'narrator', text: 'Yamaloka. The Hall of Records. Three forty-seven A M, Cosmic Standard Time.' },
  narrator1: { who: 'narrator', text: 'Chitragupta keeps the deeds of every soul, inside the Karma D B.' },
  chitra1: { who: 'chitra', text: 'One quick cleanup... and tomorrow\u2019s queue will be shorter.' },
  narrator2: { who: 'narrator', text: 'He meant to delete one soul. But he forgot the WHERE clause.' },
  narrator3: { who: 'narrator', text: 'The editor warns him. He doesn\u2019t look.' },
  chitra2: { who: 'chitra', text: 'Hey Ram! Where did all the souls go?!' },
  yama: { who: 'yama', text: 'Chitragupta!! Where are my souls?!' },
  quest1: { who: 'narrator', text: 'Heaven and Hell are in chaos.' },
  quest2: { who: 'narrator', text: 'Souls queue endlessly at the gates.' },
  quest3: { who: 'narrator', text: 'Only the Sages of Normalization can restore the Karma D B.' },
} as const

export type ClipId = keyof typeof voiceLines

export const clipUrl: Record<ClipId, string> = Object.fromEntries(
  (Object.keys(voiceLines) as ClipId[]).map((id) => [id, `/audio/intro/${id}.mp3`]),
) as Record<ClipId, string>
