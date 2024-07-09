import { atom } from 'recoil';

const L04SP031State = atom<TL04SP031>({
  key: 'L04SP031State',
  default: {
    p01: {
      isChecked: Array.from({ length: 27 }, () => false) as boolean[],
    },
    p02: {
      dictionary: {},
      englishWordList: [],
      meaningList: [],
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
    p06: {
      answer: '',
      isSubmitted: false,
    },
    p13: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p14: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p15: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p16: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p17: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p18: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p19: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04SP031 = {
  [key: string]: any;
  p01: {
    isChecked: boolean[];
  };
  p02: {
    dictionary: { [key: string]: string };
    englishWordList: { word: string; isCorrect: boolean }[];
    meaningList: { meaning: string; isCorrect: boolean }[];
  };
  p13: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p14: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p15: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p16: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p17: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p18: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p19: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export default L04SP031State;
