import { atom } from 'recoil';

export const L02C08A05b = atom<TL02C08A05b>({
  key: 'L02C08A05b',
  default: {
    p01: {
      dropArr: ['touches', 'touched'],
      answer: '',
      solution: 'touched',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      dropArr: ['has', 'had'],
      answer: '',
      solution: 'had',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['are', 'were'],
      answer: '',
      solution: 'were',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: ['live', 'lived'],
      answer: '',
      solution: 'lived',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr: ['are', 'were'],
      answer: '',
      solution: 'were',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C08A05b = {
  p01: IL02C08A05b;
  p02: IL02C08A05b;
  p03: IL02C08A05b;
  p04: IL02C08A05b;
  p05: IL02C08A05b;
};

interface IL02C08A05b {
  dropArr: string[];
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
