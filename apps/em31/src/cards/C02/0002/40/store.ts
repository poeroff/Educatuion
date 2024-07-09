import { atom } from 'recoil';

export const C02_0002_40 = atom<TC02000240>({
  key: 'C02000240',
  default: {
    P01: {
      answer: {
        value1: '',
      },
      solution: {
        value1: '6',
      },
      isCorrect: {
        value1: false,
      },
      isSubmitted: false,
    },
  },
});
type TC02000240 = {
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
