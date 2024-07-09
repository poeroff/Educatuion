import { atom } from 'recoil';

export const L01C08A05a = atom<TL01C08A05a>({
  key: 'L01C08A05a',
  default: {
    p01: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: 'had finished',
        value2: 'received',
      },
      isCorrect: [false, false],
      isSubmitted: false,
    },
    p02: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: 'donated',
        value2: 'had earned',
      },
      isCorrect: [false, false],
      isSubmitted: false,
    },
    p03: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: 'found',
        value2: 'had called',
      },
      isCorrect: [false, false],
      isSubmitted: false,
    },
    p04: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: 'noticed',
        value2: 'had broken',
      },
      isCorrect: [false, false],
      isSubmitted: false,
    },
    p05: {
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: 'realized',
        value2: 'had put',
      },
      isCorrect: [false, false],
      isSubmitted: false,
    },
  },
});

export type TL01C08A05a = {
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  p03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  p04: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  p05: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
};
