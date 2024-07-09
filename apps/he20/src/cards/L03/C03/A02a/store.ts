import { atom } from 'recoil';

export const L03C03A02a = atom<TL03C03A02a>({
  key: 'HE20L03C03A02a',
  default: {
    p01: {
      answer: [],
      solution: [2, 3, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: '',
      answer9: '',
      solution1: 'silence',
      solution2: 'distract',
      solution3: 'video',
      solution4: 'recordings',
      solution5: 'emergency',
      solution6: 'exits',
      solution7: 'emergency',
      solution8: '15',
      solution9: 'first',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C03A02a = {
  p01: {
    answer: number[];
    solution: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    answer5: string;
    answer6: string;
    answer7: string;
    answer8: string;
    answer9: string;
    solution1: string;
    solution2: string;
    solution3: string;
    solution4: string;
    solution5: string;
    solution6: string;
    solution7: string;
    solution8: string;
    solution9: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
