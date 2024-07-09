import { userSubmissionType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const L02C12A05 = atom<IL02C12A05>({
  key: 'L02C12A05',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answer: '',
      solution: `He gets help from the Internet.`,
      isSubmitted: false,
    },
  },
});

export const getUserSubmissionStoreP01 = (value: number, isCorrect: boolean): userSubmissionType[] => {
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

export const getUserSubmissionStoreP02 = (value: string): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: value,
          isAnswer: true,
        },
      ],
    },
  ];
};

interface IL02C12A05 {
  p01: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
}
