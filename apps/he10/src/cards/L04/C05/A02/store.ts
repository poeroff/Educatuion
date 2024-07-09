import { userSubmissionType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const L04C05A02 = atom({
  key: 'L04C05A02',
  default: {
    p02: {
      answer: '',
      solution: 'hrow away',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'ecycle',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export const getUserSubmissionStore = (value: string, isCorrect = false): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: value,
          isAnswer: true,
          isCorrect: isCorrect,
        },
      ],
    },
  ];
};
