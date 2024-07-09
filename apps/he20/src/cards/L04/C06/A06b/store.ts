import { atom } from 'recoil';

export const L04C06A06b = atom<TL04C06A06b>({
  key: 'L04C06A06b',
  default: {
    p02: {
      answer: '',
      solution: 'controlled',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C06A06b = {
  p02: IL04C06A06b;
};

interface IL04C06A06b {
  answer: string | undefined;
  solution: string | undefined;
  isCorrect: boolean | undefined;
  isSubmitted: boolean;
}
