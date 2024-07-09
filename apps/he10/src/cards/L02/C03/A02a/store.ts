import { atom } from 'recoil';

export const L02C03A02a = atom<TL02C03A02a>({
  key: 'L02C03A02a',
  default: {
    p01: {
      answer: '',
      solution: 'greeting',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', '', ''],
      solution: ['culture', 'gifts', 'rude', 'head', 'impolite'],
      isCorrectInput: [false, false, false, false, false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C03A02a = {
  p01: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer: string[];
    solution: string[];
    isCorrectInput: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
