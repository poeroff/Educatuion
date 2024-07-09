import { atom } from 'recoil';

const L04SP011State = atom<TL04C07A04>({
  key: 'L04SP011State',
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
    p09: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p10: {
      inputs: ['', '', ''] as string[],
      isSubmitted: false,
    },
    p11: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p12: {
      clickedChipButtons: [] as number[],
      isSubmitted: false,
    },
    p13: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
    p14: {
      selectedIdx: null as number | null,
      isSubmitted: false,
    },
  },
});

type TL04C07A04 = {
  [key: string]: any;
  p01: {
    isChecked: boolean[];
  };
  p02: {
    dictionary: { [key: string]: string };
    englishWordList: { word: string; isCorrect: boolean }[];
    meaningList: { meaning: string; isCorrect: boolean }[];
  };
  p11: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p12: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
};

export default L04SP011State;
