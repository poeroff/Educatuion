import { atom } from 'recoil';

export const L01C06A07 = atom<TL01C06A07>({
  key: 'L01C06A07',
  default: {
    p02: {
      data: [
        {
          contents: 'The speaker suggests that kindness is the way to succeed, rather than being the biggest or the strongest.',
          userAnswer: undefined,
        },
      ],
      solution: [true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A07 = {
  p02: {
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
