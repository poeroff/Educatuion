import { atom } from 'recoil';

export const A01_0008_08 = atom<TA01_0008_08>({
  key: 'A01_0008_08',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA01_0008_08 = {
  p01: IA01_0008_08;
};

interface IA01_0008_08 {
  answer: number;
  isSubmitted: boolean;
}
