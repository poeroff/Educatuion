import { atom } from 'recoil';

export const L01C06A07b = atom<TL01C06A07b>({
  key: 'L01C06A07b',
  default: {
    p02: {
      data: [
        {
          contents: 'The speaker suggests that being the biggest or the strongest is the key to success.',
          userAnswer: undefined,
        },
      ],
      solution: [false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A07b = {
  p02: {
    data: Array<IL01C06A07b>;
    solution: Array<Boolean>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

type IL01C06A07b = {
  contents: string;
  userAnswer: boolean | undefined;
};
