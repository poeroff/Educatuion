import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { atom } from 'recoil';

export const L02SP01_1 = atom<TL02SP01_1>({
  key: 'L02SP01_1',
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
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: null,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'chemical',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'entire',
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      dropArr: [
        ['12%', '20%'],
        ['four-dollar', 'five-dollar'],
        ['deal', 'day'],
      ],
      answer: ['', '', ''],
      solution: ['20%', 'five-dollar', 'deal'],
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      dropArr: [
        ['sporting goods', 'soccer goods'],
        ['send', 'sell'],
        ['used', 'old'],
      ],
      answer: ['', '', ''],
      solution: ['sporting goods', 'sell', 'used'],
      isCorrect: false,
      isSubmitted: false,
    },
    p11: {
      answer: [] as number[],
      solution: [
        {
          text: 'more',
          answer: 2,
          isError: false,
        },
        {
          text: 'I think',
          answer: 0,
          isError: false,
        },
        {
          text: 'comfortable',
          answer: 3,
          isError: false,
        },
        {
          text: 'cotton is',
          answer: 1,
          isError: false,
        },
        {
          text: 'than wool',
          answer: 4,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: [] as number[],
      solution: [
        {
          text: 'to',
          answer: 2,
          isError: false,
        },
        {
          text: 'very wise',
          answer: 1,
          isError: false,
        },
        {
          text: 'things',
          answer: 4,
          isError: false,
        },
        {
          text: 'buy',
          answer: 3,
          isError: false,
        },
        {
          text: 'it`s',
          answer: 0,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
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

type TL02SP01_1 = {
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
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p10: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p11: {
    answer: number[];
    solution: IChipButtonInfo[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p12: {
    answer: number[];
    solution: IChipButtonInfo[];
    isCorrect: boolean;
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
