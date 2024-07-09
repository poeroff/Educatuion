import { atom } from 'recoil';

export const L03C08A03 = atom<TL03C08A03>({
  key: 'L03C08A03',
  default: {
    p01: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
      solution: 'while',
    },
    p02: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
      solution: 'during',
    },
    p03: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
      solution: 'Despite',
    },
    p04: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
      solution: 'due to',
    },
    p05: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
      solution: 'Although',
    },
  },
});

type TL03C08A03 = {
  p01: {
    answer: string | undefined;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p02: {
    answer: string | undefined;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p03: {
    answer: string | undefined;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p04: {
    answer: string | undefined;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p05: {
    answer: string | undefined;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
};
