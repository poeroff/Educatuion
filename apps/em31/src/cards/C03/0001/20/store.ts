import { atom } from 'recoil';

export const C03_0001_20 = atom<T03000120>({
  key: 'C01000120',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
      solution: 19,
    },
  },
});

type T03000120 = {
  P02: {
    answer: number | '';
    isSubmitted: boolean;
    solution: number;
  };
};
