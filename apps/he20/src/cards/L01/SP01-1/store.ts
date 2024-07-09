import { atom } from 'recoil';

export const L01SP01_1 = atom<TL01SP01_1>({
  key: 'L01SP01_1',
  default: {
    p01: {
      isChecked: [false, false, false, false, false, false, false, false, false, false] as boolean[],
    },
    p02: {
      dictionary: {},
      englishWordList: [],
      meaningList: [],
    },
    p03: {
      answer: null,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: null,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'mobile',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'countless',
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      inputs: ['', '', ''],
      isSubmitted: false,
    },
    p10: {
      inputs: ['', '', ''],
      isSubmitted: false,
    },
    p11: {
      clickedChipButtons: [],
      isSubmitted: false,
    },
    p12: {
      clickedChipButtons: [],
      isSubmitted: false,
    },
    p13: {
      selectedIdx: null,
      isSubmitted: false,
    },
    p14: {
      selectedIdx: null,
      isSubmitted: false,
    },
  },
});

type TL01SP01_1 = {
  [key: string]: any;
  p01: {
    isChecked: boolean[];
  };
  p02: {
    dictionary: { [key: string]: string };
    englishWordList: { word: string; isCorrect: boolean }[];
    meaningList: { meaning: string; isCorrect: boolean }[];
  };
  p03: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p04: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p05: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p06: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p09: {
    inputs: string[];
    isSubmitted: boolean;
  };
  p10: {
    inputs: string[];
    isSubmitted: boolean;
  };
  p11: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p12: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p13: {
    selectedIdx: number | null;
    isSubmitted: boolean;
  };
  p14: {
    selectedIdx: number | null;
    isSubmitted: boolean;
  };
};
