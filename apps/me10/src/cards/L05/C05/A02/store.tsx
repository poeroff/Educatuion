import { atom } from 'recoil';

export const L05C05A02 = atom<TA_L05_C05_A02>({
  key: 'L05C05A02',
  default: {
    p01: {
      answer1: '',
      isSubmitted: false,
    },
  },
});

type TA_L05_C05_A02 = {
  p01: {
    answer1: string;
    isSubmitted: boolean;
  };
};
