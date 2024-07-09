import { atom } from 'recoil';

export const C03_0002_10 = atom<TC03000210>({
  key: 'C03000210',
  default: {
    p01: {
      answers: ['', ''],
      solutions: ['15÷3=5', '5'],
      isSubmitted: false,
      isCorrect: false,
    },
    p02: {
      answers: ['', ''],
      solutions: ['6', '3'],
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answers: ['', ''],
      solutions: ['6', '5'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

interface TPageType {
  answers: string[];
  solutions: string[];
  isSubmitted: boolean;
  isCorrect: boolean;
}
interface TC03000210 {
  p01: TPageType;
  p02: TPageType;
  p03: TPageType;
}
