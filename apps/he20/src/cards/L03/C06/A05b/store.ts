import { atom } from 'recoil';

export const L03C06A05b = atom<TL03C06A05b>({
  key: 'L03C06A05b',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      solution1: 'talent',
      solution2: 'successful',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL03C06A05b = {
  p02: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
