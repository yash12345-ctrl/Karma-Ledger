import nf1 from '../assets/1nf.jpg'
import nf2 from '../assets/2nf.jpg'
import nf3 from '../assets/3nf.jpg'
import bcnf from '../assets/bcnf.jpg'
import nf4 from '../assets/4nf.jpg'

export type JourneyChip = {
  label: string
  icon?: 'card' | 'user' | 'lineage' | 'chat' | 'star'
}

export type JourneyStep = {
  id: string
  form: string
  guide: string
  description: string
  image: string
  imagePosition: string
  /** Primary accent colour (hex) used for border, glow and header tint */
  accent: string
  chips?: JourneyChip[]
  chipLayout?: 'flow' | 'stack'
}

export const journey: JourneyStep[] = [
  {
    id: '1nf',
    form: '1NF',
    guide: 'Sage Agastya',
    description: 'Smashes multi-valued arrays into atomic, individual rows.',
    image: nf1,
    imagePosition: '50% 30%',
    accent: '#3d94ff',
  },
  {
    id: '2nf',
    form: '2NF',
    guide: 'Sage Bhrigu',
    description: 'Separates soul data from deed data. Removes partial dependencies.',
    image: nf2,
    imagePosition: '50% 38%',
    accent: '#a35cff',
  },
  {
    id: '3nf',
    form: '3NF',
    guide: 'Sage Bhrigu',
    description: 'Handles transitive dependencies with lookup tables.',
    image: nf3,
    imagePosition: '50% 62%',
    accent: '#2fd98a',
    chipLayout: 'flow',
    chips: [{ label: 'KarmaType' }, { label: 'Consequence' }, { label: 'Realm' }],
  },
  {
    id: 'bcnf',
    form: 'BCNF',
    guide: 'Sage Narada',
    description: 'Enforces that every determinant must be a candidate superkey.',
    image: bcnf,
    imagePosition: '30% 40%',
    accent: '#f5a623',
    chipLayout: 'stack',
    chips: [
      { label: 'SoulID', icon: 'user' },
      { label: 'Court', icon: 'card' },
      { label: 'Judge', icon: 'star' },
    ],
  },
  {
    id: '4nf',
    form: '4NF',
    guide: 'Goddess Chhinnamasta',
    description: 'Eradicates multi-valued dependencies and redundant Cartesian products.',
    image: nf4,
    imagePosition: '50% 38%',
    accent: '#e84bb8',
    chipLayout: 'stack',
    chips: [
      { label: 'Languages', icon: 'chat' },
      { label: 'Spiritual Skills', icon: 'star' },
    ],
  },
]
