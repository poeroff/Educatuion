import { atom } from 'recoil';

export const L04C08A03a = atom<TAL04C08A03a>({
  key: 'L04C08A03a',
  default: {
    p01: {
      userInput: '',
      isSubmitted: false,
      solution: `finds it interesting to learn`,
    },
    p02: {
      userInput: '',
      isSubmitted: false,
      solution: `consider it unhealthy to eat`,
    },
    p03: {
      userInput: '',
      isSubmitted: false,
      solution: `make it more convenient to take`,
    },
  },
});

type TAL04C08A03a = {
  p01: {
    userInput: string;
    isSubmitted: boolean;
    solution: string;
  };
  p02: {
    userInput: string;
    isSubmitted: boolean;
    solution: string;
  };
  p03: {
    userInput: string;
    isSubmitted: boolean;
    solution: string;
  };
};
