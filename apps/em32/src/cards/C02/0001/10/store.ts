import { atom } from 'recoil';

export const C02000110_store = atom<TC02000110_store>({
  key: 'C02000110_store',
  default: {
    p01: {
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      solution1: true,
      solution2: false,
      solution3: true,
      solution4: false,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC02000110_store = {
  p01: {
    [key: string]: boolean;
  };
};
