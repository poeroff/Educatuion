import { atom } from 'recoil';

export const L03C06A03a = atom<TL03C06A03a>({
  key: 'L03C06A03a',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL03C06A03a = {
  p02: {
    answer: string | undefined;
    isSubmitted: boolean;
  };
};
