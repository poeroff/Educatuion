import { atom } from 'recoil';

export const L02C07A02b = atom<TL01C07A02b>({
  key: 'L02C07A02b',
  default: {
    p02: {
      dropArr: ['fill in', 'drive'],
      answer: [''],
      solution: ['drive'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['fire', 'fill in'],
      answer: [''],
      solution: ['fire'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: ['fill in', 'drive'],
      answer: [''],
      solution: ['fill in'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr: ['fire', 'passed away'],
      answer: [''],
      solution: ['passed away'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C07A02b = {
  p02: IL01C07A02b;
  p03: IL01C07A02b;
  p04: IL01C07A02b;
  p05: IL01C07A02b;
};

interface IL01C07A02b {
  dropArr: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
