import { atom } from 'recoil';

export const A01_0009_02 = atom<TA01_0009_02>({
  key: 'A01_0009_02',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA01_0009_02 = {
  p01: IA01_0009_02;
};

interface IA01_0009_02 {
  answer: number;
  isSubmitted: boolean;
}
