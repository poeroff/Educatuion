import { atom } from 'recoil';

export const B02_0011_40 = atom<TB02_0011_40>({
  key: 'B02_0011_40',
  default: {
    P01: {
      isCorrect: false,
      isSubmitted: false,
      answer: [false, false, false, false],
      solution: [true, false, true, false],
    },
    P02: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 2,
    },
    P03: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 1,
    },
    P04: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 3,
    },
    P05: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 3,
    },
    P06: {
      isCorrect: false,
      isSubmitted: false,
      answer: '',
      solution: ['ㅁㅂㅅ', 'ㅅㅂㅁ'],
    },
    P07: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 2,
    },
    P08: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 3,
    },
    P09: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 1,
    },
    P10: {
      isCorrect: false,
      isSubmitted: false,
      answer: -1,
      solution: 2,
    },
  },
});

type TB02_0011_40 = {
  P01: TMultiSelectAnswer;
  P02: TSelectAnswer;
  P03: TSelectAnswer;
  P04: TSelectAnswer;
  P05: TSelectAnswer;
  P06: TAnswer;
  P07: TSelectAnswer;
  P08: TSelectAnswer;
  P09: TSelectAnswer;
  P10: TSelectAnswer;
};

type TSelectAnswer = {
  isCorrect: boolean;
  isSubmitted: boolean;
  answer: number;
  solution: number;
};

type TMultiSelectAnswer = {
  isCorrect: boolean;
  isSubmitted: boolean;
  answer: boolean[];
  solution: boolean[];
};

type TAnswer = {
  isCorrect: boolean;
  isSubmitted: boolean;
  answer: string;
  solution: string[];
};
