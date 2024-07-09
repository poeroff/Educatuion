import { atom } from 'recoil';

export const L04C08A05a = atom<TL04C08A05a>({
  key: 'L04C08A05a',
  default: {
    p01: {
      answer: '',
      solution: 'I agree with the opinion that we should have a flea market this Friday.',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'He has a dream that one day he will open a restaurant named after himself.',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'honesty is the best policy is widely accepted in many cultures',
      isSubmitted: false,
    },
  },
});

type TL04C08A05a = {
  p01: {
    answer: string;
    isSubmitted: boolean;
    solution: string;
  };
  p02: {
    answer: string;
    isSubmitted: boolean;
    solution: string;
  };
  p03: {
    answer: string;
    isSubmitted: boolean;
    solution: string;
  };
};
