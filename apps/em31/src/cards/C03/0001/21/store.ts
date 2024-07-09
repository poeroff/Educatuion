import { atom } from 'recoil';

export const C03_0001_21 = atom<T03000121>({
  key: 'C03_0001_21',
  default: {
    P02: {
      answers: [
        {
          value: '',
          isAnswer: false,
        },
        {
          value: '',
          isAnswer: false,
        },
      ],
      isCorrect: false,
      isSubmitted: false,
      solution: ['5', '5'],
    },
  },
});

type T03000121 = {
  P02: {
    answers: TAnswer[];
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string[];
  };
};

export type TAnswer = {
  value: string;
  isAnswer: boolean;
};
