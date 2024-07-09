import { atom } from 'recoil';

export const L04C05A02 = atom<TA_L04_C05_A02>({
  key: 'L04C05A02',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      isSubmitted: false,
    },
  },
});

type TA_L04_C05_A02 = {
  p01: {
    answer1: string;
    answer2: string;
    answer3: string;
    isSubmitted: boolean;
  };
};
