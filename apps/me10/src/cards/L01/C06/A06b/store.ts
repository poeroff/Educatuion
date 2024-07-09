import { atom } from 'recoil';

export const L01C06A06b = atom<TL01C06A06b>({
  key: 'L01C06A06b',
  default: {
    p02: {
      values: [''],
      answers: ['F'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A06b = {
  p02: IL01C06A06b;
};

interface IL01C06A06b {
  values: string[];
  answers: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
