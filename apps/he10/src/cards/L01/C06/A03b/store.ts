import { atom } from 'recoil';

export const L01C06A03b = atom<TL01C06A03b>({
  key: 'L01C06A03b',
  default: {
    p02: {
      data: [{ contents: '(1) The boy won the dance competition.', userAnswer: undefined }],
      solution: [true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A03b = {
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
