import { atom } from 'recoil';

export const L01SP042 = atom<TL01SP042>({
  key: 'L01SP042',
  default: {
    p07: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 3,
    },
    p08: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 3,
    },
    p11: {
      answer: [],
      solution: [1, 0, 2, 3, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: [],
      solution: [2, 0, 3, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01SP042 = {
  p07: IL01SP042P7;
  p08: IL01SP042P8;
  p11: IL01SP042P11;
  p12: IL01SP042P12;
};
export interface IL01SP042P7 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL01SP042P8 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL01SP042P11 {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
export interface IL01SP042P12 {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
