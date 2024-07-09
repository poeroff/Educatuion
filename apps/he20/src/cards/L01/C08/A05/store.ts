import { atom } from 'recoil';

export const L01C08A05 = atom<TL01C08A05>({
  key: 'L01C08A05',
  default: {
    p01: {
      answer: '',
      solution: 'received',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'had earned',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'found',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'noticed',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'had put',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C08A05 = {
  p01: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p02: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p03: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p04: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
  p05: {
    answer: string;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: string;
  };
};
