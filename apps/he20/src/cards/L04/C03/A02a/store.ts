import { atom } from 'recoil';

export const L04C03A02a = atom<TL04C03A02a>({
  key: 'HE20L04C03A02a',
  default: {
    p01: {
      answer: [],
      correctAnswer: [3, 5],
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: 'history',
      solution2: 'future',
      solution3: 'climate change',
      solution4: 'greenhouse gases',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C03A02a = {
  p01: {
    answer: number[];
    correctAnswer: number[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    solution1: string;
    solution2: string;
    solution3: string;
    solution4: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
