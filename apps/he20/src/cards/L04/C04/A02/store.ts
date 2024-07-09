import { atom } from 'recoil';

export const L04C04A02 = atom<TL04C04A02>({
  key: 'L04C04A02',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      isSubmitted: false,
    },
  },
});

type TL04C04A02 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    isSubmitted: boolean;
  };
};
