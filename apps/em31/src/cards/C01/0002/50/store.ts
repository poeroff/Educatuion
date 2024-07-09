import { atom } from 'recoil';

export const STC01000250 = atom<TC01000250>({
  key: 'STC01000250',
  default: {
    p01: {
      answer: '',
      solution: '569',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC01000250 = {
  p01: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
