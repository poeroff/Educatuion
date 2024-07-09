import { atom } from 'recoil';

export const C02000112_store = atom<TC02000112_store>({
  key: 'C02000112_store',
  default: {
    p01: {
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      solution1: false,
      solution2: true,
      solution3: false,
      solution4: true,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC02000112_store = {
  p01: {
    [key: string]: boolean;
  };
};
