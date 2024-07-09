import { atom } from 'recoil';

export const L03C06A04 = atom<TL03C06A04>({
  key: 'L03C06A04',
  default: {
    p02: {
      answer: undefined,
      correctAnswer: true,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C06A04 = {
  p02: {
    answer: boolean | undefined;
    correctAnswer: boolean;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
