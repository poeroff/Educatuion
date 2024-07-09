import { atom } from 'recoil';

export const L05C05A03 = atom<TAL05C05A03>({
  key: 'L05C05A03',
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

type TAL05C05A03 = {
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
