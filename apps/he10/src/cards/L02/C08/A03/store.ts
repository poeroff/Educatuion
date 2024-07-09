import { atom } from 'recoil';

export const L02C08A03 = atom<{
  [key: string]: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
}>({
  key: 'L02C08A03',
  default: {
    p01: {
      answer: '',
      solution: 'how old the largest tree is',
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answer: '',
      solution: 'how kind the local people were to us',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer: '',
      solution: 'how often they ate out',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
