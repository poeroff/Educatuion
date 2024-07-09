import { atom } from 'recoil';

export const L04C08A03 = atom<{
  [key: string]: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
}>({
  key: 'L04C08A03',
  default: {
    p01: {
      answer: '',
      solution: 'it interesting to learn a second language',
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answer: '',
      solution: 'it unhealthy to eat too much sugar',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer: '',
      solution: 'it more convenient to take long journeys',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
