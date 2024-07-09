import { atom } from 'recoil';

export const L03C11A05 = atom<TL03C11A05>({
  key: 'L03C11A05',
  default: {
    p01: {
      isSubmitted: false,
      answer: '',
    },
  },
});

type TL03C11A05 = {
  p01: {
    isSubmitted: boolean;
    answer: string;
  };
};
