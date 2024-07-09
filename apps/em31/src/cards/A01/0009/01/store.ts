import { atom } from 'recoil';

export const A01_0009_01 = atom<TA01_0009_01>({
  key: 'A01_0009_01',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA01_0009_01 = {
  p01: IA01_0009_01;
};

interface IA01_0009_01 {
  answer: number;
  isSubmitted: boolean;
}
