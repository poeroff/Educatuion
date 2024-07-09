import { atom } from 'recoil';
export const L05C12A05 = atom<TL05C12A05>({
  key: 'L05C12A05',
  default: {
    p01: {
      answer: '',
      solution: ['environment', 'nvironment'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: `his own water bottle`,
      isSubmitted: false,
    },
  },
});

type TL05C12A05 = {
  p01: {
    answer: string;
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
};
