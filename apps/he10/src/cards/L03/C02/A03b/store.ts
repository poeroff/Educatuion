import { atom } from 'recoil';

export const L03C02A03b = atom<{
  p01: {
    userAnswer: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    userAnswer: Array<boolean | undefined>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
}>({
  key: 'L03C02A03b',
  default: {
    p01: {
      userAnswer: 0,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      userAnswer: [undefined, undefined, undefined],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
