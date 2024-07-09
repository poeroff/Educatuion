import { atom } from 'recoil';

export const L02C06A03b = atom<TL02C06A03b>({
  key: 'L02C06A03b',
  default: {
    p02: {
      values: [''],
      answers:['T'],
      isCorrect : false,
      isSubmitted: false,
    },
  },
});

type TL02C06A03b = {
  p02: IL02C06A03b;
};

interface IL02C06A03b {
  values: string[];
  answers: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
