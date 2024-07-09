import { atom } from 'recoil';

export const L02C06A07b = atom<TL02C06A07b>({
  key: 'L02C06A07b',
  default: {
    p02: {
      dropArr: [['ban', 'promote']],
      answer: [''],
      solution: ['ban'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C06A07b = {
  p02: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
