import { atom } from 'recoil';

export const L04C08A07 = atom<TAL04C08A07>({
  key: 'L04C08A07',
  default: {
    p01: {
      userInputs: Array(5).fill(''),
      isSubmitted: false,
    },
  },
});

type TAL04C08A07 = {
  p01: {
    userInputs: string[];
    isSubmitted: boolean;
  };
};
