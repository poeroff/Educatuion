import { atom } from 'recoil';

export const L02SP042 = atom<TL02SP042>({
  key: 'L02SP042',
  default: {
    p07: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p08: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p11: {
      answer: [],
      solution: [2, 0, 4, 1, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: [],
      solution: [2, 0, 4, 1, 3],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02SP042 = {
  p07: IL02SP042P7;
  p08: IL02SP042P8;
  p11: IL02SP042P11;
  p12: IL02SP042P12;
};

export interface IL02SP042P7 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL02SP042P8 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL02SP042P11 {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
export interface IL02SP042P12 {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
