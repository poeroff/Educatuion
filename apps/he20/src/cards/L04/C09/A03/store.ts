import { atom } from 'recoil';

export const L04C09A03 = atom<TL04C09A03>({
  key: 'L04C09A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TL04C09A03 = {
  p01: {
    [key: string]: string | boolean
    answer1: string;
    answer2: string;
    answer3: string;
    isSubmitted: boolean;
  },
  p02: {
    answer: string;
    isSubmitted: boolean;
  },
  p03: {
    answer: string[];
    isSubmitted: boolean;
  }

};

