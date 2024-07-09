import { userSubmissionType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const L02C11A04 = atom({
  key: 'L02C11A04',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: '틀린 부분 : (a) how thin was Nani Tama',
      solution2: '고친 내용 : how thin Nani Tama was',
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

export const getUserSubmissionStoreP02 = (value1: string, value2: string): userSubmissionType[] => {
  return [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: value1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: value2,
          isAnswer: true,
        },
      ],
    },
  ];
};
