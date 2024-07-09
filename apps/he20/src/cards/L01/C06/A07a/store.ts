import { atom } from 'recoil';

export const L01C06A07a = atom<TL01C06A07a>({
  key: 'L01C06A07a',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
      solution:
        'Activities such as cutting down trees and extensive coastal development can take away animals’ homes. I think these are serious problems that need our attention.',
    },
    P03: {
      answer: '',
      isSubmitted: false,
      solution: 'She felt grateful for the opportunity to volunteer.',
    },
  },
});

type TL01C06A07a = {
  P02: {
    answer: string | undefined;
    isSubmitted: boolean;
    solution: string;
  };
  P03: {
    answer: string | undefined;
    isSubmitted: boolean;
    solution: string;
  };
};
