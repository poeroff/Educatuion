import { atom } from 'recoil';

export const A01_0008_07 = atom<TA01_0008_07>({
  key: 'A01_0008_07',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA01_0008_07 = {
  p01: IA01_0008_07;
};

interface IA01_0008_07 {
  answer: number;
  isSubmitted: boolean;
}
