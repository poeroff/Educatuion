import { atom } from 'recoil';
import { IChipButtonInfo } from '@maidt-cntn/ui/en';

export const L04SP01_1 = atom<TL04SP01_1>({
  key: 'L04SP01_1',
  default: {
    P01: {
      isChecked: [false, false, false, false, false, false, false, false, false, false] as boolean[],
      isSubmitted: false,
    },
    P02: {
      answer: '',
      isSubmitted: false,
    },
    P03: {
      answer: null,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    P04: {
      answer: null,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    P05: {
      answer: '',
      solution: 'convenient',
      isCorrect: false,
      isSubmitted: false,
    },
    P06: {
      answer: '',
      solution: 'nutrient',
      isCorrect: false,
      isSubmitted: false,
    },
    P09: {
      dropArr: [
        ['test', 'text'],
        ['how to', 'what to'],
        ['transmit', 'translate'],
      ],
      answer: ['', '', ''],
      solution: ['text', 'how to', 'translate'],
      isCorrect: false,
      isSubmitted: false,
    },
    P10: {
      dropArr: [
        ['feature', 'function'],
        ['convenient', 'comfortable'],
        ['low-tech', 'high-tech'],
      ],
      answer: ['', '', ''],
      solution: ['function', 'comfortable', 'high-tech'],
      isCorrect: false,
      isSubmitted: false,
    },
    P11: {
      answer: [] as number[],
      solution: [
        {
          text: 'Italian',
          answer: 4,
          isError: false,
        },
        {
          text: 'What if',
          answer: 0,
          isError: false,
        },
        {
          text: 'is written ',
          answer: 2,
          isError: false,
        },
        {
          text: 'the menu',
          answer: 1,
          isError: false,
        },
        {
          text: 'only in',
          answer: 3,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
    P12: {
      answer: [] as number[],
      solution: [
        {
          text: 'how to',
          answer: 3,
          isError: false,
        },
        {
          text: 'use them',
          answer: 4,
          isError: false,
        },
        {
          text: 'Can',
          answer: 0,
          isError: false,
        },
        {
          text: 'you',
          answer: 1,
          isError: false,
        },
        {
          text: 'show me',
          answer: 2,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
    P13: {
      selectedIdx: null,
      isSubmitted: false,
    },
    P14: {
      selectedIdx: null,
      isSubmitted: false,
    },
  },
});

type TL04SP01_1 = {
  [key: string]: any;
  P01: {
    isChecked: boolean[];
    isSubmitted: boolean;
  };
  P03: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P04: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P05: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P06: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P09: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P10: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P11: {
    answer: number[];
    solution: IChipButtonInfo[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P12: {
    answer: number[];
    solution: IChipButtonInfo[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P13: {
    selectedIdx: number | null;
    isSubmitted: boolean;
  };
  P14: {
    selectedIdx: number | null;
    isSubmitted: boolean;
  };
};
