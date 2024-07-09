import { atom } from 'recoil';

export const L02C06A07a = atom<TL02C06A07a>({
  key: 'L02C06A07a',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
      solution: 'They probably felt grateful to Nani Tama and proud of their traditions.',
    },
  },
});

type TL02C06A07a = {
  p02: {
    answer: string;
    isSubmitted: boolean;
    solution: string;
  };
};
