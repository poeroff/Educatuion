import { atom } from 'recoil';

export const L07C06A07 = atom<TL07C06A07>({
  key: 'L07C06A07',
  default: {
    p02: {
      answer: '',
      solution: 'Egypt',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL07C06A07 = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
