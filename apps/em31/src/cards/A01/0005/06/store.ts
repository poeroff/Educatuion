import { atom } from 'recoil';

export const A01_0005_06 = atom<TA01000505>({
  key: 'A01_0005_06',
  default: {
    p01: {
      subtractionAnswers: [
        ['', '', ''],
        ['', '', ''],
      ],
      problemAnswers: ['', ''],
      subtractionSolutions: [[...String(753)], [...String(224)]],
      problemSolutions: [String(652), String(100)],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA01000505 = {
  p01: {
    subtractionAnswers: string[][];
    problemAnswers: string[];
    subtractionSolutions: string[][];
    problemSolutions: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
