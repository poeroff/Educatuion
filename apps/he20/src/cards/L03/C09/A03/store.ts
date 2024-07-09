import { atom } from 'recoil';

export const L03C09A03 = atom<TIL03C09A03>({
  key: 'L03C09A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      isCorrect: false,
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

type TIL03C09A03 = {
  p01: IL03C09A03P1;
  p02: IL03C09A03P2;
  p03: IL03C09A03P3;
};

export interface IL03C09A03P1 {
  [key: string]: string | boolean;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  isCorrect: false;
  isSubmitted: boolean;
}

interface IL03C09A03P2 {
  answer: string;
  isSubmitted: boolean;
}

interface IL03C09A03P3 {
  answer: string[];
  isSubmitted: boolean;
}
