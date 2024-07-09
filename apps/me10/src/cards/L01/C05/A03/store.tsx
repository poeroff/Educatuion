import { atom } from 'recoil';

export const L01C05A03 = atom<TA_L01_C05_A03>({
  key: 'L01C05A03',
  default: {
    p01: {
      userInputs1: -1,
      userInputs2: '',
      isSubmitted: false,
    },
  },
});

type TA_L01_C05_A03 = {
  p01: {
    userInputs1: number;
    userInputs2: string;
    isSubmitted: boolean;
  };
};
