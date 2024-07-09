import { atom } from 'recoil';

export const L05C06A07 = atom<TL05C06A07>({
  key: 'L05C06A07',
  default: {
    p02: {
      answer: '',
      solution: 'b',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL05C06A07 = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
