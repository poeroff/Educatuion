import { atom } from 'recoil';

export const B02_0011_50 = atom<Record<TB02001150Keys, IB02001150>>({
  key: 'B02_0011_50',
  default: {
    p01: {
      answer: '',
      solution: 13,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 8,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 21,
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TB02001150Keys = 'p01' | 'p02' | 'p03';

export interface IB02001150 {
  answer: string;
  solution: number;
  canvasDataURL: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
