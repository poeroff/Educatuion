import { atom } from 'recoil';

export const L02C05A02 = atom<TA_L02_C05_A02>({
  key: 'L02C05A02',
  default: {
    p01: {
      userInputs: '',
      isSubmitted: false,
    },
  },
});

type TA_L02_C05_A02 = {
  p01: {
    userInputs: string;
    isSubmitted: boolean;
  };
};
