import { atom } from 'recoil';

type TL03C06A07a = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
};

export const L03C06A07a = atom<TL03C06A07a>({
  key: 'L03C06A07a',
  default: {
    p02: {
      answer: '',
      solution: 'It refers to various social issues caused by noise pollution.',
      isSubmitted: false,
    },
  },
});
