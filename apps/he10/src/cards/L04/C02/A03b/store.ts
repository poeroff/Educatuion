import { atom } from 'recoil';

export const L04C02A03b = atom<TL04C02A03b>({
  key: 'L04C02A03b',
  default: {
    p01: {
      dropArr: ['May', 'ecosystem', 'food'],
      answer: ['', '', ''],
      solution: ['May', 'ecosystem', 'food'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      data: [
        { contents: '(1) The sea level is rising steadily but with some ups and downs.', userAnswer: undefined },
        { contents: '(2) Tuvalu’s land may disappear into the sea within fifty years. ', userAnswer: undefined },
        { contents: '(3) If Tuvalu’s land is lost, Tuvaluan will lost their culture and traditions as well as their homes.', userAnswer: undefined },
      ],
      solution: [true, false, true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C02A03b = {
  p01: {
    dropArr: string[];
    answer: (string | undefined)[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    data: Array<Idata>;
    solution: Array<Boolean>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export type Idata = {
  contents: string;
  userAnswer: boolean | undefined;
};
