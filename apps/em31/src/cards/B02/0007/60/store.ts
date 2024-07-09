import { atom } from 'recoil';

export const B02_0007_60 = atom<TB02000760>({
  key: 'B02000760',
  default: {
    P01: {
      answer: [{ value: '' }, { value: '' }, { value: '' }],
      solution: {
        value1: '가',
        value2: '나',
        value3: '라',
      },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TB02000760 = {
  P01: {
    answer: {
      [key: string]: string;
    }[];
    solution: {
      [key: string]: string;
    };
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
