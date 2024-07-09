import { atom } from 'recoil';

export const L03C06A03b = atom<TL03C06A03b>({
  key: 'L03C06A03b',
  default: {
    p02: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      isSubmitted: false,
    },
  },
});

type TL03C06A03b = {
  p02: {
    answer: { [key: string]: string };
    isSubmitted: boolean;
  };
};
