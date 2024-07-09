import { atom } from 'recoil';

export const C02000121_store = atom<TC02000121>({
  key: 'C02000121',
  default: {
    P02: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: '꼭짓점',
        value2: '변',
      },
      isCorrect: {
        value1: false,
        value2: false,
      },
      isSubmitted: false,
    },
  },
});
type TC02000121 = {
  P02: {
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
