import { atom } from 'recoil';

export const L04C05A03 = atom<TAL04C05A03>({
  key: 'L04C05A03',
  default: {
    p01: {
      input: '',
      isSubmitted: false,
    },
  },
});

type TAL04C05A03 = {
  p01: {
    input: string;
    isSubmitted: boolean;
  };
};
