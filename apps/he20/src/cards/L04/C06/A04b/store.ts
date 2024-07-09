import { atom } from 'recoil';

export const L04C06A04b = atom<TL04C06A04b>({
  key: 'L04C06A04b',
  default: {
    p02: {
      data: [
        {
          contents: 'Neural implants electrically stimulate targeted\n regions of the brain at the right time to treat brain disorders.',
          userAnswer: undefined,
        },
      ],
      solution: [true, false, true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C06A04b = {
  p02: {
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
