import { atom } from 'recoil';

export const L02C08A03 = atom<TL02C08A03>({
  key: 'L02C08A03',
  default: {
    p01: {
      dropArr: ['leave', 'have left'],
      answer: '',
      solution: 'have left',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      dropArr: ['cannot', 'should'],
      answer: '',
      solution: 'cannot',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['must', 'cannot'],
      answer: '',
      solution: 'must',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: ['buy', 'have bought'],
      answer: '',
      solution: 'have bought',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr: ['should', 'must'],
      answer: '',
      solution: 'should',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C08A03 = {
  p01: IL02C08A03;
  p02: IL02C08A03;
  p03: IL02C08A03;
  p04: IL02C08A03;
  p05: IL02C08A03;
};

interface IL02C08A03 {
  dropArr: string[];
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
