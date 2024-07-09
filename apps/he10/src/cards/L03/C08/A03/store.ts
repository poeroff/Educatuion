import { atom } from 'recoil';

export const L03C08A03 = atom<{
  [key: string]: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
}>({
  key: 'L03C08A03',
  default: {
    p01: {
      answer: '',
      solution: 'does he say',
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answer: '',
      solution: 'can she attend',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer: '',
      solution: 'lies a beautiful park where people can relax',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
