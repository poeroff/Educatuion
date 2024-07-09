import { atom } from 'recoil';

export const L01C03A02 = atom<TL01C03A02>({
  key: 'L01C03A02',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        {
          text: 'the importance of wildlife crossings',
        },
        {
          text: 'problems in constructing animal-friendly roads',
        },
        {
          text: 'what drivers should do when encountering wildlife',
        },
      ],
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: ['vet'],
      solution2: ['homeless'],
      solution3: ['locations', 'areas'],
      solution4: ['well-being'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C03A02 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
    data: { text: string }[];
  };
  p03: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    solution1: string[];
    solution2: string[];
    solution3: string[];
    solution4: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
