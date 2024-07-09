import { atom } from 'recoil';

export const L04C06A03 = atom<TL04C06A03>({
  key: 'L04C06A03',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: 'nervous',
      solution2: 'system',
      solution3: 'spinal',
      solution4: 'cord',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C06A03 = {
  p02: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    solution1: string;
    solution2: string;
    solution3: string;
    solution4: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
