import { atom } from 'recoil';

export const L04C02A03a = atom<TL04C02A03a>({
  key: 'L04C02A03a',
  default: {
    p01: {
      answer1: '',
      solution1: 'translator',
      answer2: '',
      solution2: 'Italy',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: 'Headphones',
      answer2_1: '',
      solution2_1: 'Phone',
      answer2_2: '',
      solution2_2: 'Calls',
      answer3: '',
      solution3: 'Arms',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C02A03a = {
  p01: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    answer1: string;
    solution1: string;
    answer2_1: string;
    solution2_1: string;
    answer2_2: string;
    solution2_2: string;
    answer3: string;
    solution3: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
