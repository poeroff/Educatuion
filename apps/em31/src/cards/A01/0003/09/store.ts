import { atom } from 'recoil';

export const A01_0003_09 = atom<TA01_0003_09>({
  key: 'A01_0003_09',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA01_0003_09 = {
  p01: IA01_0003_09;
};

interface IA01_0003_09 {
  answer: number | undefined;
  isSubmitted: boolean;
}
