import { atom } from 'recoil';

export const L04C08A03b = atom<TAL04C08A03b>({
  key: 'L04C08A03b',
  default: {
    p01: {
      userInput: '',
      isSubmitted: false,
      solution: `it interesting to learn`,
      isCorrect: false,
    },
    p02: {
      userInput: '',
      isSubmitted: false,
      solution: `it unhealthy to eat`,
      isCorrect: false,
    },
    p03: {
      userInput: '',
      isSubmitted: false,
      solution: `it more convenient to take`,
      isCorrect: false,
    },
  },
});

type TAL04C08A03b = {
  p01: {
    userInput: string;
    isSubmitted: boolean;
    solution: string;
    isCorrect: boolean;
  };
  p02: {
    userInput: string;
    isSubmitted: boolean;
    solution: string;
    isCorrect: boolean;
  };
  p03: {
    userInput: string;
    isSubmitted: boolean;
    solution: string;
    isCorrect: boolean;
  };
};
