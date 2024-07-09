import { atom } from 'recoil';

export const L04C08A05b = atom<{
  [key: string]: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
}>({
  key: 'L04C08A05b',
  default: {
    p01: {
      answer: '',
      solution: 'not a singer but an actor',
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answer: '',
      solution: 'not only exercises regularly but also maintains',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer: '',
      solution: 'either watching movies or playing games',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
