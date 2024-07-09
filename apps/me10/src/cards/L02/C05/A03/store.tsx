import { atom } from 'recoil';

export const L02C05A03 = atom<TAL02C05A03>({
  key: 'L02C05A03',
  default: {
    p01: {
      input1: '',
      input2: '',
      isSubmitted: false,
    },
    p02: {
      input1: '',
      input2: '',
      isSubmitted: false,
    },
  },
});

type TAL02C05A03 = {
  p01: {
    input1: string;
    input2: string;
    isSubmitted: boolean;
  };
  p02: {
    input1: string;
    input2: string;
    isSubmitted: boolean;
  };
};
