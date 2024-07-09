import { atom } from 'recoil';

export const L03C02A03 = atom<TL03C02A03>({
  key: 'L03C02A03',
  default: {
    p01: {
      isSubmitted: false,
      isCorrect: false,
      answer: -1,
      solution: 3,
    },
    p03: {
      data: [
        { contents: '(1) The boy has problems with his nose.', userAnswer: undefined },
        { contents: '(2) The two openings in our noses function as filters.', userAnswer: undefined },
        { contents: '(3) The openings don’t perform any functions when they are at rest.', userAnswer: undefined },
      ],
      solution: [false, true, false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C02A03 = {
  p01: {
    answer: number;
    solution: number;
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

type Idata = {
  contents: string;
  userAnswer: boolean | undefined;
};
