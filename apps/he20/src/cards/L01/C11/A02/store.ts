import { atom } from 'recoil';

export const L01C11A02 = atom<TL01C11A02>({
  key: 'L01C11A02',
  default: {
    p01: {
      selectedIdx: null as number | null,
      isSubmitted: false,
      solution: 4,
    },
    p02: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: false,
      solution2: false,
      solution3: true,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL01C11A02 = {
  p01: {
    selectedIdx: number | null;
    isSubmitted: boolean;
    solution: number;
  };
  p02: {
    answer1: boolean | undefined;
    answer2: boolean | undefined;
    answer3: boolean | undefined;
    solution1: boolean;
    solution2: boolean;
    solution3: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
