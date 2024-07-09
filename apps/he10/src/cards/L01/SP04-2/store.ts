import { atom } from 'recoil';

export const L01SP04_2 = atom<TL01SP04_2>({
  key: 'L01SP04_2',
  default: {
    p09: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p11: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p13: {
      answer: '',
      solution: [
        'The customer who you called yesterday is waiting for you outside.',
        'The customer whom you called yesterday is waiting for you outside.',
        'The customer that you called yesterday is waiting for you outside.',
      ],
      isCorrect: false,
      isSubmitted: false,
    },
    p14: {
      answer: '',
      solution: 'Known for their unique design, these shoes are always popular among teenagers.',
      isCorrect: false,
      isSubmitted: false,
    },
    p15: {
      answer: '',
      solution: 'The town is peaceful and quiet, surrounded by mountains and a lake.',
      isCorrect: false,
      isSubmitted: false,
    },
    p16: {
      answer: '',
      solution: 'Accepting different opinions and perspectives, we can make better decisions.',
      isCorrect: false,
      isSubmitted: false,
    },
    p17: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p18: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p19: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01SP04_2 = {
  p09: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p10: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p11: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p12: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p13: {
    answer: string;
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p14: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p15: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p16: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p17: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p18: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p19: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export type Idata = {
  contents: string;
  userAnswer: boolean | undefined;
};
