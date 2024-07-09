import { atom } from 'recoil';

export const L02C07A02a = atom<TL01C07A02a>({
  key: 'L02C07A02a',
  default: {
    p02: {
      dropArr: ['a', 'b', 'c', 'd'],
      answer: [''],
      solution: ['d'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['a', 'b', 'c', 'd'],
      answer: [''],
      solution: ['a'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: ['a', 'b', 'c', 'd'],
      answer: [''],
      solution: ['c'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      dropArr: ['a', 'b', 'c', 'd'],
      answer: [''],
      solution: ['b'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C07A02a = {
  p02: IL01C07A02a;
  p03: IL01C07A02a;
  p04: IL01C07A02a;
  p05: IL01C07A02a;
};

interface IL01C07A02a {
  dropArr: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
