import { atom } from 'recoil';

export const B02_0002_70 = atom<TB02000270>({
  key: 'B02000270',
  default: {
    P01: {
      answer: {
        value1: '',
      },
      solution: {
        value1: '2',
      },
      isCorrect: {
        value1: false,
      },
      isSubmitted: false,
    },
  },
});
type TB02000270 = {
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
