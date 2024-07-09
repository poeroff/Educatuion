import { atom } from 'recoil';

export const L03C07A02 = atom<TL03C07A02>({
  key: 'L03C07A02',
  default: {
    p02: {
      dropArr1: ['slave', 'married', 'physical', 'challenges'],
      answer: [''],
      solution: ['challenges'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr1: ['slave', 'married', 'physical', 'challenges'],
      dropArr2: ['life', 'factory', 'private', 'Christmas'],
      answer: ['', ''],
      solution: ['slave', 'factory'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr1: ['slave', 'married', 'physical', 'challenges'],
      dropArr2: ['life', 'factory', 'private', 'Christmas'],
      answer: ['', ''],
      solution: ['physical', 'Christmas'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr1: ['life', 'factory', 'private', 'Christmas'],
      dropArr2: ['slave', 'married', 'physical', 'challenges'],
      answer: ['', ''],
      solution: ['private', 'married'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C07A02 = {
  p02: IL03C07A02;
  p03: IL03C07A02;
  p04: IL03C07A02;
  p05: IL03C07A02;
};

interface IL03C07A02 {
  dropArr1: string[];
  dropArr2?: string[];
  dropArr3?: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
