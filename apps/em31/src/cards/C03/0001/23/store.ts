import { atom } from 'recoil';

export const C03_0001_23 = atom<T03000123>({
  key: 'C03_0001_23',
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
        {
          value: '',
          isAnswer: false,
        },
      ],
      isCorrect: false,
      isSubmitted: false,
      solution: ['4', '20', '20'],
    },
  },
});

type T03000123 = {
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
