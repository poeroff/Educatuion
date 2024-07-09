import { atom } from 'recoil';

type L04P02Type = {
  [key: string]: {
    userAnswer: string | string[] | number | number[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};

export interface IChoice {
  id: number;
  text: string;
}

export const L04Sp04_2 = atom<L04P02Type>({
  key: 'L04Sp04_2',
  default: {
    P07: {
      userAnswer: 0,
      isSubmitted: false,
      isCorrect: false,
    },
    P08: {
      userAnswer: 0,
      isSubmitted: false,
      isCorrect: false,
    },
    P11: {
      userAnswer: [],
      isSubmitted: false,
      isCorrect: false,
    },
    P12: {
      userAnswer: [],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
