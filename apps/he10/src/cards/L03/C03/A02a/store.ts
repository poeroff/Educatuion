import { atom } from 'recoil';

export const L03C03A02a = atom<TL03C03A02a>({
  key: 'L03C03A02a',
  default: {
    p01: {
      answer: [],
      solution: [1, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      answer4: undefined,
      solution1: 'under',
      solution2: 'whisper',
      solution3: ['other', 'opposite'],
      solution4: 'travel along',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C03A02a = {
  p01: {
    answer: number[];
    solution: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer1: string | undefined;
    answer2: string | undefined;
    answer3: string | undefined;
    answer4: string | undefined;
    solution1: string;
    solution2: string;
    solution3: string[];
    solution4: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
