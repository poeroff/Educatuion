import { atom } from 'recoil';

export const L03C08A03a = atom<TL03C08A03a>({
  key: 'L03C08A03a',
  default: {
    p01: {
      answer1: '',
      solution1: 'O',
      answer2: '',
      solution2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      solution1: 'O',
      answer2: '',
      solution2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: 'X',
      answer2: '',
      solution2: 'Despite',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      solution1: 'X',
      answer2: '',
      solution2: ['due to', 'because of'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer1: '',
      solution1: 'X',
      answer2: '',
      solution2: 'Although',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C08A03a = {
  p01: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p02: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p04: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p05: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
