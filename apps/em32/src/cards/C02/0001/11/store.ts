import { atom } from 'recoil';

export const C02000111_store = atom<TC02000111_store>({
  key: 'C02000111_store',
  default: {
    p01: {
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      solution1: true,
      solution2: false,
      solution3: false,
      solution4: true,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC02000111_store = {
  p01: {
    [key: string]: boolean;
  };
};
