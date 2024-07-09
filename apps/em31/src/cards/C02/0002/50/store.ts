import { atom } from 'recoil';

export const C02_0002_50 = atom<TC02000250>({
  key: 'C02000250',
  default: {
    P01: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: '굽은',
        value2: '곧은',
      },
      isCorrect: {
        value1: false,
        value2: false,
      },
      isSubmitted: false,
    },
  },
});
type TC02000250 = {
  P01: {
    answer: {
      [key: string]: string;
    };
    solution: {
      [key: string]: string;
    };
    isCorrect: {
      [key: string]: boolean;
    };
    isSubmitted: boolean;
  };
};
