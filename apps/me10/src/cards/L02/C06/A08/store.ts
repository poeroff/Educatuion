import { atom } from 'recoil';

export const L02C06A08 = atom<TL02C06A08>({
  key: 'L02C06A08',
  default: {
    p02: {
      answer: '',
      solution: 'social media',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL02C06A08 = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
