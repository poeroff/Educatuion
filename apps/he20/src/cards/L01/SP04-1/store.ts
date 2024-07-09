import { atom } from 'recoil';

export const L01SP041 = atom<TL01SP041>({
  key: 'L01SP041',
  default: {
    p05: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p06: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 3,
    },
    p07: {
      answer: [],
      solution: [4, 0, 1, 3, 2],
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: [],
      solution: [0, 3, 2, 4, 1],
      isCorrect: false,
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
      solution: 4,
    },
    p11: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 5,
    },
  },
});

type TL01SP041 = {
  p05: IL01SP041P5;
  p06: IL01SP041P6;
  p07: IL01SP041P7;
  p08: IL01SP041P8;
  p09: IL01SP041P9;
  p10: IL01SP041P10;
  p11: IL01SP041P11;
};

export interface IL01SP041P5 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL01SP041P6 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL01SP041P7 {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
export interface IL01SP041P8 {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
export interface IL01SP041P9 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL01SP041P10 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
export interface IL01SP041P11 {
  answer: number;
  isSubmitted: boolean;
  isCorrect: boolean;
  solution: number;
}
