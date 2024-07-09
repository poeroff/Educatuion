import { atom } from 'recoil';

export const STL03C06A06 = atom<TL03C06A06>({
  key: 'STL03C06A06',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      solution: ['vehicle', 'noise'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C06A06 = {
  p02: {
    answer1: string;
    answer2: string;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
