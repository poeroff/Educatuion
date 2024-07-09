import { atom } from 'recoil';

export const A01_0008_06 = atom<TA01_0008_06>({
  key: 'A01_0008_06',
  default: {
    p01: {
      answer: -1,
      isSubmitted: false,
    },
  },
});

type TA01_0008_06 = {
  p01: IA01_0008_06;
};

interface IA01_0008_06 {
  answer: number;
  isSubmitted: boolean;
}
