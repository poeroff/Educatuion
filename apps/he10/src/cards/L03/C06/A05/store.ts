import { atom } from 'recoil';

export const L03C06A05 = atom<TL03C06A05>({
  key: 'L03C06A05',
  default: {
    p02: {
      data: [{ contents: 'Noise-cancelling technology can completely eliminate both expected and unexpected sounds.', userAnswer: undefined }],
      solution: [false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C06A05 = {
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
