import { atom } from 'recoil';

export const C03_0001_12 = atom<TC03000112>({
  key: 'C03000112',
  default: {
    p01: {
      answers: ['', ''],
      solutions: ['9', '63'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TC03000112 = {
  p01: {
    answers: string[];
    solutions: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
