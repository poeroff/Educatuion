import { atom } from 'recoil';

export const L02C05A03 = atom<TL02C03A03>({
  key: 'L02C05A03',
  default: {
    p01: {
      answer: '',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      isSubmitted: false,
    },
    p04: {
      answer: '',
      isSubmitted: false,
    },
    p05: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL02C03A03 = {
  p01: {
    answer: string;
    isSubmitted: boolean;
  };
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
  p03: {
    answer: string;
    isSubmitted: boolean;
  };
  p04: {
    answer: string;
    isSubmitted: boolean;
  };
  p05: {
    answer: string;
    isSubmitted: boolean;
  };
};
