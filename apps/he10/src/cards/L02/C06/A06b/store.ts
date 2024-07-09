import { atom } from 'recoil';

export const L02C06A06b = atom<TL02C06A06b>({
  key: 'L02C06A06b',
  default: {
    p02: {
      dropArr: [['names', 'address']],
      answer: [''],
      solution: ['names'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C06A06b = {
  p02: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
