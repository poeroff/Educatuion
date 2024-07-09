import { atom } from 'recoil';

export const C02_0007_20 = atom<TC02000720>({
  key: 'C02000720',
  default: {
    P02: {
      answer: [{ value: '' }, { value: '' }, { value: '' }],
      solution: {
        value1: '가',
        value2: '나',
        value3: '라',
      },
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC02000720 = {
  P02: {
    answer: {
      [key: string]: string;
    }[];
    solution: {
      [key: string]: string;
    };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
