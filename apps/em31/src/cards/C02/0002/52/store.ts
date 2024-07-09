import { atom } from 'recoil';

export const C02_0002_52 = atom<TC02000252>({
  key: 'C02000252',
  default: {
    P01: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: {
        value1: '나',
        value2: '라',
        value3: '마',
      },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
type TC02000252 = {
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
