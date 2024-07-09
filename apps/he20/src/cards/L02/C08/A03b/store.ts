import { atom } from 'recoil';

export const L02C08A03b = atom<TL02C08A03b>({
  key: 'L02C08A03b',
  default: {
    p01: {
      dropArr: ['should', 'may'],
      userInput: '',
      solution: 'may',
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      dropArr: ['cannot', 'should'],
      userInput: '',
      solution: 'cannot',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      dropArr: ['must', 'cannot'],
      userInput: '',
      solution: 'must',
      isSubmitted: false,
      isCorrect: false,
    },
    p04: {
      dropArr: ['must not', 'should not'],
      userInput: '',
      solution: 'should not',
      isSubmitted: false,
      isCorrect: false,
    },
    p05: {
      dropArr: ['should', 'must'],
      userInput: '',
      solution: 'should',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL02C08A03b = {
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
