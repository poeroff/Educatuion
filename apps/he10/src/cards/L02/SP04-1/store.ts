import { atom } from 'recoil';

export const L02CP041 = atom<TL02CP041>({
  key: 'L02CP041',
  default: {
    p05: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 1,
    },
    p06: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p07: {
      answer: '',
      isSubmitted: false,
    },
    p08: {
      answer: '',
      isSubmitted: false,
    },
    p09: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 4,
    },
    p10: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 1,
    },
    p11: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 1,
    },
  },
});

type TL02CP041 = {
  p05: IL02CP041P5;
  p06: IL02CP041P6;
  p07: IL02CP041P7;
  p08: IL02CP041P8;
  p09: IL02CP041P9;
  p10: IL02CP041P10;
  p11: IL02CP041P11;
};

export interface IL02CP041P5 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL02CP041P6 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL02CP041P7 {
  answer: string;
  isSubmitted: boolean;
}
export interface IL02CP041P8 {
  answer: string;
  isSubmitted: boolean;
}
export interface IL02CP041P9 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL02CP041P10 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL02CP041P11 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
