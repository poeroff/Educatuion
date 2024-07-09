import { atom } from 'recoil';

export const A05040508_store = atom<TA05040508>({
  key: 'A05040508',
  default: {
    P01: {
      answer: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
      solution: [
        [false, true],
        [true, false],
        [true, false],
        [false, true],
      ],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA05040508 = {
  P01: {
    answer: boolean[][];
    solution: boolean[][];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
