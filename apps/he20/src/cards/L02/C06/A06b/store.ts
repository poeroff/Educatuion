import { atom } from 'recoil';

export const L02C06A06b = atom<TL02C06A06b>({
  key: 'L02C06A06b',
  default: {
    p02: {
      values: [''],
      answers:['T'],
      isCorrect : false,
      isSubmitted: false,
    },
  },
});

type TL02C06A06b = {
  p02: IL02C06A06b;
};

interface IL02C06A06b {
  values: string[];
  answers: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
