import { atom } from 'recoil';

export const L02C06A07 = atom<TL02C06A07>({
  key: 'L02C06A07',
  default: {
    p02: {
      answer: '',
      solution: 'at night',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL02C06A07 = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
