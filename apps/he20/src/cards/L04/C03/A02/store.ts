import { atom } from 'recoil';

export const L04C03A02 = atom<TL04C03A02>({
  key: 'L04C03A02',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      data: [
        { contents: '(1) The speaker is explaining the history of food technology.', value: undefined, answer: false },
        { contents: '(2) It will be possible to grow crops in AI-controlled buildings in the future.', value: undefined, answer: true },
        { contents: '(3) Laboratory meat is good for the environment, but not as tasty as real meat.', value: undefined, answer: false },
      ],
      solution: [false, true, false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C03A02 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    data: Array<Tdata>;
    solution: Array<Boolean>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export type Tdata = {
  contents: string;
  value: boolean | undefined;
  answer: boolean;
};
