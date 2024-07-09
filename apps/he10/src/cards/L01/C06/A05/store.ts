import { atom } from 'recoil';

export const L01C06A05 = atom<TL01C06A05>({
  key: 'L01C06A05',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      solution1: 'wolves',
      solution2: 'chimpanzees',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A05 = {
  p02: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
