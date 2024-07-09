import { atom } from 'recoil';

export const L02C03A02 = atom<TL02C03A02>({
  key: 'L02C03A02',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        {
          text: 'Buy things on sale to save money.',
        },
        {
          text: 'Make a spending plan to use money wisely.',
        },
        {
          text: 'Talk to your parents before spending money.',
        },
      ],
    },
    p03: {
      data: [
        { contents: '(1) The girl is not satisfied with the online course she is taking now.', userAnswer: '' },
        { contents: '(2) The boy advises the girl to take the most popular course.', userAnswer: '' },
        { contents: '(3) The girl will watch introduction videos to choose a new course.', userAnswer: '' },
      ],
      solution: ['T', 'F', 'T'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C03A02 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
    data: { text: string }[];
  };
  p03: {
    data: Array<Idata>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export type Idata = {
  contents: string;
  userAnswer: string;
};
