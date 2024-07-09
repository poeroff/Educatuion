import { atom } from 'recoil';

export const C02_0002_51 = atom<TC02000251>({
  key: 'C02000251',
  default: {
    P01: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: {
        value1: '가',
        value2: '다',
        value3: '바',
      },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
type TC02000251 = {
  P01: {
    answer: {
      [key: string]: string;
    };
    solution: {
      [key: string]: string;
    };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
