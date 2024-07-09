import { atom } from 'recoil';

type answerType_1 = {
  answer: string;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};
type answerType_2 = {
  answer: string[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IB03_0008_40 {
  p01: answerType_1;
  p02: answerType_1;
  p03: answerType_1;
  p04: answerType_1;
  p05: answerType_2;
  p06: answerType_2;
  p07: answerType_2;
  p08: answerType_2;
  p09: answerType_1;
  p10: answerType_1;
}

export const B03_0008_40 = atom<IB03_0008_40>({
  key: 'B03_0008_40',
  default: {
    p01: {
      isSubmitted: false,
      answer: '',
      solution: 2,
      isCorrect: false,
    },
    p02: {
      isSubmitted: false,
      answer: '',
      solution: 7,
      isCorrect: false,
    },
    p03: {
      isSubmitted: false,
      answer: '',
      solution: 6,
      isCorrect: false,
    },
    p04: {
      isSubmitted: false,
      answer: '',
      solution: 9,
      isCorrect: false,
    },
    p05: {
      isSubmitted: false,
      answer: ['', ''],
      solution: [4, 3],
      isCorrect: false,
    },
    p06: {
      isSubmitted: false,
      answer: ['', ''],
      solution: [40, 40],
      isCorrect: false,
    },
    p07: {
      isSubmitted: false,
      answer: ['', ''],
      solution: [6, 6],
      isCorrect: false,
    },
    p08: {
      isSubmitted: false,
      answer: ['', ''],
      solution: [9, 9],
      isCorrect: false,
    },
    p09: {
      isSubmitted: false,
      answer: '',
      solution: 8,
      isCorrect: false,
    },
    p10: {
      isSubmitted: false,
      answer: '',
      solution: 9,
      isCorrect: false,
    },
  },
});
