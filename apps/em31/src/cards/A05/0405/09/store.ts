import { atom } from 'recoil';

export const A05040510_store = atom<TA05040510>({
  key: 'A05040510',
  default: {
    p01: {
      answer: 0,
      isSubmitted: false,
    },
  },
});

type TA05040510 = {
  p01: IA05040510;
};

interface IA05040510 {
  answer: number;
  isSubmitted: boolean;
}
