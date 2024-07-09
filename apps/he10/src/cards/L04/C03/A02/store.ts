import { atom } from 'recoil';

export const L04C03A02 = atom<TL04C03A02>({
  key: 'L04C03A02',
  default: {
    p03: {
      answer: ['', ''],
      solution: ['call', 'visit our website'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C03A02 = {
  p03: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
