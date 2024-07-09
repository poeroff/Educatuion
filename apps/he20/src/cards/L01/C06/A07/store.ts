import { atom } from 'recoil';

export const L01C06A07 = atom<TL01C06A07>({
  key: 'L01C06A07',
  default: {
    P02: {
      answer: ['', ''],
      commentary: ['cutting down trees and extensive coastal development', 'these are serious problems that need our attention'],
      solution: ['', ''],
      isCorrectInput: [false, false],
      isSubmitted: false,
      isCorrect: false,
    },
    P03: {
      answer: ['', ''],
      solution: ['felt', 'grateful'],
      isCorrectInput: [false, false],
      isSubmitted: false,
      isCorrect: false,
      commentary: ['', ''],
    },
  },
});

type TL01C06A07 = {
  [key: string]: PageData;
};

type PageData = {
  answer: string[];
  solution: string[];
  isSubmitted: boolean;
  isCorrect?: boolean;
  isCorrectInput: boolean[];
  commentary: string[];
};
