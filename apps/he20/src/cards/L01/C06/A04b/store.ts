import { userSubmissionType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const L01C06A04b = atom({
  key: 'L01C06A04b',
  default: {
    p02: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
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
