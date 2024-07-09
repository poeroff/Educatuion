import { atom } from 'recoil';

export const L03C08A03b = atom<TAL03C08A03b>({
  key: 'L03C08A03b',
  default: {
    p01: {
      dropArr: ['during', 'while'],
      userInput: '',
      solution: 'while',
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      dropArr: ['during', 'while'],
      userInput: '',
      solution: 'during',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      dropArr: ['Despite', 'Although'],
      userInput: '',
      solution: 'Despite',
      isSubmitted: false,
      isCorrect: false,
    },
    p04: {
      dropArr: ['because', 'due to'],
      userInput: '',
      solution: 'due to',
      isSubmitted: false,
      isCorrect: false,
    },
    p05: {
      dropArr: ['Despite', 'Although'],
      userInput: '',
      solution: 'Although',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TAL03C08A03b = {
  p01: {
    dropArr: string[];
    userInput: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p02: {
    dropArr: string[];
    userInput: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    dropArr: string[];
    userInput: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p04: {
    dropArr: string[];
    userInput: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p05: {
    dropArr: string[];
    userInput: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
