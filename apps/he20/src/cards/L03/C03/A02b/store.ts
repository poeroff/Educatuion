import { atom } from 'recoil';

export const L03C03A02b = atom<TL03C03A02b>({
  key: 'HE20L03C03A02b',
  default: {
    p01: {
      answer: undefined,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: 'silence',
      solution2: 'emergency',
      solution3: '15',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C03A02b = {
  p01: {
    answer: number | undefined;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer1: string;
    answer2: string;
    answer3: string;
    solution1: string;
    solution2: string;
    solution3: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
