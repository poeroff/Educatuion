import { atom } from 'recoil';

export const A03_0003_08 = atom<TA03_0003_08>({
  key: 'A03_0003_08',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA03_0003_08 = {
  p01: IA03_0003_08;
};

interface IA03_0003_08 {
  answer: number;
  isSubmitted: boolean;
}
