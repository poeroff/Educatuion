import { atom } from 'recoil';

export const L03C06A07 = atom<TL03C06A07>({
  key: 'L03C06A07',
  default: {
    p02: {
      answer: ['', '', '', ''],
      solution: ['social', 'issues', 'noise', 'pollution'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TL03C06A07 = {
  p02: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
