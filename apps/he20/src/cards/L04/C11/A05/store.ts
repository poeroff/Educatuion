import { atom } from 'recoil';

export const L04C11A05 = atom<TL04C11A05>({
  key: 'L04C11A05',
  default: {
    p01: {
      isSubmitted: false,
      answer: '',
    },
  },
});

type TL04C11A05 = {
  p01: {
    isSubmitted: boolean;
    answer: string;
  };
};
