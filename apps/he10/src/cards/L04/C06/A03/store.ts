import { atom } from 'recoil';

export const L04C06A03 = atom<TL04C06A03>({
  key: 'L04C06A03',
  default: {
    p02: {
      answers: ['', '', '', ''],
      solutions: ['one', 'cup', 'of', 'coffee'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C06A03 = {
  p02: {
    answers: string[];
    solutions: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
