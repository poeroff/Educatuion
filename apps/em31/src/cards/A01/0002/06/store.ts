import { atom } from 'recoil';

export const A01_0002_06 = atom<TA01000206>({
  key: 'A01_0002_06',
  default: {
    p01: {
      answer: [['', '', ''], ['', '', ''], [''], ['']],
      solution: [['8', '3', '2'], ['7', '8', '4'], ['764'], ['678']],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA01000206 = {
  p01: {
    answer: string[][];
    solution: string[][];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
