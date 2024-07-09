import { atom } from 'recoil';

export const L01C06A05 = atom<TL01C06A05>({
  key: 'L01C06A05',
  default: {
    p02: {
      answer: '',
      solution: 'sticky notes',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A05 = {
  p02: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
