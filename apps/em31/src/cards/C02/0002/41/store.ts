import { atom } from 'recoil';

export const C02_0002_41 = atom<TC02000241>({
  key: 'C02000241',
  default: {
    P01: {
      answer: {
        value1: '',
      },
      solution: {
        value1: '민지',
      },
      isCorrect: {
        value1: false,
      },
      isSubmitted: false,
    },
  },
});
type TC02000241 = {
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
