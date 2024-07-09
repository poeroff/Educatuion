import { atom } from 'recoil';

export const L03C03A02 = atom<TL03C03A02>({
  key: 'L03C05A03',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answers: ['', '', '', ''],
      solutions: ['silence', 'recordings', 'emergency exits', '15'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C03A02 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answers: string[];
    solutions: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
