import { atom } from 'recoil';

interface IVoca {
  id: number;
  word: string;
  meaning: string;
  memorized: boolean;
  path: string;
}
export type p01Type = {
  wordList: IVoca[];
};

interface IP02 {
  dictionary: { [key: string]: string };
  englishWordList: { word: string; isCorrect: boolean }[];
  meaningList: { meaning: string; isCorrect: boolean }[];
}

type answerdType1 = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};

type answerdType2 = {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
};

type answerdType3 = {
  [key: string]: string | number | boolean;
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IL02SP03_1 {
  p01: p01Type;
  p02: IP02;
  p03: answerdType3;
  p04: answerdType3;
  p05: answerdType1;
  p06: answerdType1;
  p12: answerdType2;
  p13: answerdType2;
  p14: answerdType2;
  p15: answerdType2;
  p16: answerdType3;
  p17: answerdType3;
  p18: answerdType3;
}

export const L02SP03_1 = atom<IL02SP03_1>({
  key: 'L02SP03-1',
  default: {
    p01: {
      wordList: [],
    },
    p02: {
      dictionary: {},
      englishWordList: [],
      meaningList: [],
    },
    p03: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'destroy',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'burst',
      isCorrect: false,
      isSubmitted: false,
    },

    p12: {
      answer: [],
      solution: [0, 1, 3, 2, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p13: {
      answer: [],
      solution: [2, 0, 1, 4, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p14: {
      answer: [],
      solution: [2, 3, 4, 0, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      answer: [],
      solution: [0, 3, 2, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p16: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p17: {
      answer: 0,
      solution: 5,
      isCorrect: false,
      isSubmitted: false,
    },
    p18: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
