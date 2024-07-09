import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { atom } from 'recoil';

export const L04SP01_2 = atom<TL04SP01_2>({
  key: 'L04SP01_2',
  default: {
    P01: {
      isChecked: [false, false, false, false, false, false, false, false, false, false] as boolean[],
    },
    P02: {
      dictionary: {},
      englishWordList: [],
      meaningList: [],
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
      answer: null,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    P06: {
      answer: null,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    P07: {
      answer: '',
      solution: 'entire',
      isCorrect: false,
      isSubmitted: false,
    },
    P08: {
      answer: '',
      solution: 'entire',
      isCorrect: false,
      isSubmitted: false,
    },
    P09: {
      answer: '',
      solution: 'target',
      isCorrect: false,
      isSubmitted: false,
    },
    P10: {
      answer: '',
      solution: 'arrange',
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
    P15: {
      dropArr: [
        ['115', '150'],
        ['injected', 'installed'],
        ['target', 'tackle'],
      ],
      answer: ['', '', ''],
      solution: ['150', 'injected', 'target'],
      isCorrect: false,
      isSubmitted: false,
    },
    P16: {
      dropArr: [
        ['water', 'nutrients'],
        ['climax', 'climate'],
        ['AI-generated', 'AI-controlled'],
      ],
      answer: ['', '', ''],
      solution: ['nutrients', 'climate', 'AI-generated'],
      isCorrect: false,
      isSubmitted: false,
    },
    P19: {
      answer: [] as number[],
      solution: [
        {
          text: 'the greenhouse gases',
          answer: 1,
          isError: false,
        },
        {
          text: 'produced',
          answer: 2,
          isError: false,
        },
        {
          text: 'cows',
          answer: 4,
          isError: false,
        },
        {
          text: 'by',
          answer: 3,
          isError: false,
        },
        {
          text: 'because of',
          answer: 0,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
    P20: {
      answer: [] as number[],
      solution: [
        {
          text: 'take place of',
          answer: 3,
          isError: false,
        },
        {
          text: 'AI',
          answer: 1,
          isError: false,
        },
        {
          text: 'don\'t think',
          answer: 0,
          isError: false,
        },
        {
          text: 'will ever',
          answer: 2,
          isError: false,
        },
        {
          text: 'human artists',
          answer: 4,
          isError: false,
        },
      ] as IChipButtonInfo[],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04SP01_2 = {
  [key: string]: any;
  P01: {
    isChecked: boolean[];
  };
  P02: {
    dictionary: { [key: string]: string };
    englishWordList: { word: string; isCorrect: boolean }[];
    meaningList: { meaning: string; isCorrect: boolean }[];
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
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P06: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P07: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P08: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P09: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P10: {
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
  P15: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P16: {
    dropArr: string[][];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P19: {
    answer: number[],
    solution: IChipButtonInfo[],
    isCorrect: boolean,
    isSubmitted: boolean,

  };
  P20: {
    answer: number[],
    solution: IChipButtonInfo[],
    isCorrect: boolean,
    isSubmitted: boolean,

  };
};
