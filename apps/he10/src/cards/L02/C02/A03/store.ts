import { atom } from 'recoil';

export const L02C02A03 = atom<TL02C02A03>({
  key: 'L02C02A03',
  default: {
    p01: {
      isSubmitted: false,
      isCorrect: false,
      answer: -1,
      solution: 3,
    },
    p03: {
      data: [
        { contents: '(1) The boy thinks novels are more boring than poems.', userAnswer: undefined },
        { contents: '(2) The girl says the interpretation of poetry can differ from person to person.', userAnswer: undefined },
        { contents: '(3) The speakers are going to attend a poetry reading event this Saturday.', userAnswer: undefined },
      ],
      solution: [false, true, true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C02A03 = {
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
