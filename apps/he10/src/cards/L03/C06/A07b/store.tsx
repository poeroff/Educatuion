import { atom } from 'recoil';

type TL03C06A07b = {
  p02: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    result: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export const L03C06A07b = atom<TL03C06A07b>({
  key: 'L03C06A07b',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      solution1: 'social',
      solution2: 'noise',
      result: [false, false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
