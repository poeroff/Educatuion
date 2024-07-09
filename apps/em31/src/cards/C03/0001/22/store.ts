import { atom } from 'recoil';

export const C03_0001_22 = atom<T03000122>({
  key: 'C01000122',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
      solution: '48',
    },
  },
});

type T03000122 = {
  P02: {
    answer: string;
    isSubmitted: boolean;
    solution: string;
  };
};
