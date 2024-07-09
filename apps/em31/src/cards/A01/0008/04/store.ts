import { atom } from 'recoil';

export const A01_0008_04 = atom<TA01_0008_04>({
  key: 'EM31A01000804',
  default: {
    p01: {
      userInputs: ['', '', ''],
      isSubmitted: false,
    },
    p02: {
      canvasDataURL: '',
      isSubmitted: false,
    },
    p03: {
      userInputs: ['', '', ''],
      isSubmitted: false,
    },
  },
});

type TA01_0008_04 = {
  p01: {
    userInputs: string[];
    isSubmitted: boolean;
  };
  p02: {
    canvasDataURL: string;
    isSubmitted: boolean;
  };
  p03: {
    userInputs: string[];
    isSubmitted: boolean;
  };
};
