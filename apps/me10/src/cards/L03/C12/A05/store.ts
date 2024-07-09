import { userSubmissionType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const L03C12A05 = atom<IL03C12A05>({
  key: 'L03C12A05',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answer: -1,
      solution: 2,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

export const getUserSubmissionStore = (value: number, isCorrect: boolean): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: value,
          isAnswer: true,
          isCorrect: isCorrect,
        },
      ],
    },
  ];
};

interface IL03C12A05 {
  p01: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p02: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
}
