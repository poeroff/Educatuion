import { atom } from 'recoil';

export const L02C11A05 = atom<TL02C11A05>({
  key: 'L02C11A05',
  default: {
    p01: {
      isSubmitted: false,
      answer: '',
    },
  },
});

type TL02C11A05 = {
  p01: {
    isSubmitted: boolean;
    answer: string;
  };
};
