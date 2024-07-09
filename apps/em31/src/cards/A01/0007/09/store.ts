import { atom } from 'recoil';

export const A01_0007_09 = atom<TA01_0007_09>({
  key: 'EM31A01000709',
  default: {
    p01: {
      radio: undefined,
      isSubmitted: false,
    },
  },
});

type TA01_0007_09 = {
  p01: {
    radio: number | undefined;
    isSubmitted: boolean;
  };
};
