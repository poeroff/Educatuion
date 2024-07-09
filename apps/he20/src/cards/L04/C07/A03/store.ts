import { atom } from 'recoil';

export const L04C07A03 = atom<TL04C07A03>({
  key: 'L04C07A03',
  default: {
    p02: {
      dropArr: ['legs', 'spine'],
      answer: [''],
      solution: ['spine'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: ['brain', 'spinal'],
      answer: [''],
      solution: ['brain'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      dropArr: ['hands', 'thoughts'],
      answer: [''],
      solution: ['thoughts'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C07A03 = {
  p02: IL04C07A03;
  p03: IL04C07A03;
  p04: IL04C07A03;
};

interface IL04C07A03 {
  dropArr: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
