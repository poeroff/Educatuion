import { atom } from 'recoil';

export const L01C06A06 = atom<TL01C06A06>({
  key: 'L01C06A06',
  default: {
    p02: {
      answer: '',
      solution: 'be you',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A06 = {
  p02: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
