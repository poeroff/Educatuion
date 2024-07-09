import { atom } from 'recoil';

export const A01_0001_05 = atom<TA01000105>({
  key: 'A01000105',
  default: {
    P02: {
      answer: ['', '', '', '', '', ''],
      solution: ['3', '1', '2', '7', '74', '32'],
      isListCorrect: [false, false, false, false, false, false],
      isSubmitted: false,
      isCorrect: false,
    },
    P03: {
      answer: ['', ''],
      solution: ['63', '27'],
      isListCorrect: [false, false],
      isSubmitted: false,
      isCorrect: false,
      commentary: `44+19=63, 63-36=27`,
    },
    P04: {
      answer: ['', ''],
      solution: [['83-24=59', '83-24'], ['59']],
      isListCorrect: [false, false],
      commentary: `(남은 고구마 수) = (전체 고구마 수) - (먹은 고구마 수)= 
      83 - 24 = 59(개), 59(개)`,
      isSubmitted: false,
      isCorrect: false,
    },
    P05: {
      // 맞춤카드 C01-0001-1001
      answer: ['', '', '', '', '', ''],
      solution: ['5', '3', '62', '6', '4', '36'],
      isListCorrect: [false, false, false, false, false, false],
      isSubmitted: false,
      isCorrect: false,
    },
    P06: {
      // 맞춤카드 C01-0001-1101
      answer: ['', ''],
      solution: ['65', '46'],
      isListCorrect: [false, false],
      isSubmitted: false,
      isCorrect: false,
    },
    P07: {
      // 맞춤카드 C01-0001-1201
      answer: ['', ''],
      solution: [['67-38=29', '67-38'], ['29']],
      isListCorrect: [false, false],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TCommon = {
  answer: string[];
  solution: string[] | string[][];
  isSubmitted: boolean;
  isCorrect: boolean;
  isListCorrect: boolean[];
  commentary?: string;
};

type TA01000105 = {
  P02: TCommon;
  P03: TCommon;
  P04: TCommon;
  P05: TCommon;
  P06: TCommon;
  P07: TCommon;
};
