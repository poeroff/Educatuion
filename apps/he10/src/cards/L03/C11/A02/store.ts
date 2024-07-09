import { atom } from 'recoil';

export const L03C11A02 = atom<TL03C11A02>({
  key: 'L03C11A02',
  default: {
    p01: {
      values: ['', ''],
      solution: ['colors', 'reflects'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C11A02 = {
  p01: {
    values: Array<string>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
