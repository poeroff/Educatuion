import { atom } from 'recoil';

export const L03C03A02 = atom<TL03C03A02>({
  key: 'L03C03A02',
  default: {
    p03: {
      answer: ['', '', ''],
      solution: ['under', 'other/opposite', 'travel'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C03A02 = {
  p03: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
