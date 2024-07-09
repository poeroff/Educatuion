import { atom } from 'recoil';

export const L01C03A02 = atom<TL01C03A02>({
  key: 'L01C03A02',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      data: [
        { contents: '(1) The boy won the dance competition.', userAnswer: undefined },
        { contents: '(2) The girl performed a dance at the school festival last year.', userAnswer: undefined },
        { contents: '(3) The speakers feel so thankful to their team members.', userAnswer: undefined },
      ],
      solution: [true, false, true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C03A02 = {
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

export type Idata = {
  contents: string;
  userAnswer: boolean | undefined;
};
