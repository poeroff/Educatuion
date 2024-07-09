import { atom } from 'recoil';

export const L01C11A05 = atom<TL01C11A05>({
  key: 'L01C11A05',
  default: {
    p01: {
      isSubmitted: false,
      answer: '',
    },
  },
});

type TL01C11A05 = {
  p01: {
    isSubmitted: boolean;
    answer: string;
  };
};
