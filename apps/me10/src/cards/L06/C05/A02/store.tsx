import { atom } from 'recoil';

export const L06C05A02 = atom<TA_L06_C05_A02>({
  key: 'L06C05A02',
  default: {
    p01: {
      userInputs: '',
      isSubmitted: false,
    },
    p02: {
      userInputs: '',
      isSubmitted: false,
    },
  },
});

type TA_L06_C05_A02 = {
  p01: {
    userInputs: string;
    isSubmitted: boolean;
  };
  p02: {
    userInputs: string;
    isSubmitted: boolean;
  };
};
