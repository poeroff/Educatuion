import { atom } from 'recoil';

export const L01C08A03b = atom<TL01C08A03b>({
  key: 'L01C08A03b',
  default: {
    p01: {
      dropArr: ['who', 'which'],
      answer: [''],
      solution: ['which'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      dropArr: ['who', 'which'],
      answer: [''],
      solution: ['who'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['who', 'which'],
      answer: [''],
      solution: ['which'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C08A03b = {
  p01: IL01C08A03b;
  p02: IL01C08A03b;
  p03: IL01C08A03b;
};

interface IL01C08A03b {
  dropArr: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
