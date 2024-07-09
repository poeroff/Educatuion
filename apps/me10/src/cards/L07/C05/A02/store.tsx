import { atom } from 'recoil';

export const L07C05A02 = atom<TA_L07_C05_A02>({
  key: 'L07C05A02',
  default: {
    p01: {
      userInputs: '',
      isSubmitted: false,
    },
  },
});

type TA_L07_C05_A02 = {
  p01: {
    userInputs: string;
    isSubmitted: boolean;
  };
};
