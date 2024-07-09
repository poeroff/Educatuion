import { atom } from 'recoil';

interface CardData {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}

interface L01C08A05bType {
  [key: string]: CardData;
}

export const L01C08A05b = atom<L01C08A05bType>({
  key: 'L01C08A05b',
  default: {
    p01: {
      answer: '',
      solution: 'had earned',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'had called',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'had broken',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'had put',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
