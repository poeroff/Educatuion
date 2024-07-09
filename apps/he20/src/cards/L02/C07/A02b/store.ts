import { atom } from 'recoil';

type pageType = {
  answer: string | undefined;
  isSubmitted: boolean;
  isCorrect: boolean;
};

interface IL02C07A02b {
  p02: pageType;
  p03: pageType;
  p04: pageType;
  p05: pageType;
}

export const L02C07A02b = atom<IL02C07A02b>({
  key: 'L02C07A02b',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
    },
    p04: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
    },
    p05: {
      answer: '',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
