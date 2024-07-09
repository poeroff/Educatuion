import { atom } from 'recoil';

export const C03_0001_10 = atom<TC03000110>({
  key: 'C03000110',
  default: {
    p01: {
      answer: '',
      solution: '8',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TC03000110 = {
  p01: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
