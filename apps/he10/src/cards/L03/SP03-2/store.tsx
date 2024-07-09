import { atom } from 'recoil';

interface IVoca {
  id: number;
  word: string;
  meaning: string;
  memorized: boolean;
  path: string;
}
type p01Type = {
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
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IL03SP03_2 {
  p01: p01Type;
  p02: IP02;
  p03: answerdType3;
  p04: answerdType3;
  p05: answerdType3;
  p06: answerdType3;
  p07: answerdType1;
  p08: answerdType1;
  p09: answerdType1;
  p10: answerdType1;
  p17: answerdType2;
  p18: answerdType2;
  p19: answerdType2;
  p20: answerdType2;
  p21: answerdType2;
  p22: answerdType2;
  p23: answerdType2;
  p24: answerdType2;
  p25: answerdType3;
  p26: answerdType3;
  p27: answerdType3;
}

export const L03SP03_2 = atom<IL03SP03_2>({
  key: 'L03SP03_2',
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
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p07: {
      answer: '',
      solution: 'peak',
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: '',
      solution: 'value',
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: '',
      solution: 'unpleasant',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'detect',
      isCorrect: false,
      isSubmitted: false,
    },
    p17: {
      answer: [],
      solution: [0, 4, 1, 2, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p18: {
      answer: [],
      solution: [3, 0, 2, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p19: {
      answer: [],
      solution: [0, 4, 1, 3, 2],
      isCorrect: false,
      isSubmitted: false,
    },
    p20: {
      answer: [],
      solution: [4, 0, 2, 1, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p21: {
      answer: [],
      solution: [4, 0, 1, 2, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p22: {
      answer: [],
      solution: [4, 1, 0, 2, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p23: {
      answer: [],
      solution: [1, 4, 3, 0, 2],
      isCorrect: false,
      isSubmitted: false,
    },
    p24: {
      answer: [],
      solution: [3, 2, 0, 1, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p25: {
      answer: 0,
      solution: 5,
      isCorrect: false,
      isSubmitted: false,
    },
    p26: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p27: {
      answer: 0,
      solution: 5,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
