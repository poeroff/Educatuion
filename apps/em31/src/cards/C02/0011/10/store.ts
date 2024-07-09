import { atom } from 'recoil';

export const C02_0011_10 = atom<Record<TC02001110Keys, IC02001110>>({
  key: 'C02_0011_10',
  default: {
    p01: {
      answer: '',
      solution: 4,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 2,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 1,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 7,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TC02001110Keys = 'p01' | 'p02' | 'p03' | 'p04';

export interface IC02001110 {
  answer: string;
  solution: number;
  canvasDataURL: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
