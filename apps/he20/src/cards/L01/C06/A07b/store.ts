import { atom } from 'recoil';

export const L01C06A07b = atom<TL01C06A07b>({
  key: 'L01C06A07b',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
      solution: `* Cutting down trees 
      * Throwing plastic waste in oceans
      `,
    },
    P03: {
      answer: undefined,
      isSubmitted: false,
      isCorrect: false,
      solution: 1,
    },
  },
});

type TL01C06A07b = {
  P02: {
    answer: string | undefined;
    isSubmitted: boolean;
    solution: string;
  };
  P03: {
    answer: number | undefined;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: number;
  };
};
