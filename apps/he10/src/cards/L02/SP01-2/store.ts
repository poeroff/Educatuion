import { atom } from 'recoil';

export const L02SP01_2 = atom<TL02SP01_2>({
  key: 'L02SP01-2',
  default: {
    p05: {
      answer: null,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: null,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: '',
      solution: 'manner',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'emotion',
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      inputs: ['', '', ''],
      isSubmitted: false,
    },
    p16: {
      inputs: ['', '', ''],
      isSubmitted: false,
    },
    p19: {
      clickedChipButtons: [],
      isSubmitted: false,
    },
    p20: {
      clickedChipButtons: [],
      isSubmitted: false,
    },
  },
});

type TL02SP01_2 = {
  p05: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p06: {
    answer: number | null;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p09: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p10: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p15: {
    inputs: string[];
    isSubmitted: boolean;
  };
  p16: {
    inputs: string[];
    isSubmitted: boolean;
  };
  p19: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
  p20: {
    clickedChipButtons: number[];
    isSubmitted: boolean;
  };
};
