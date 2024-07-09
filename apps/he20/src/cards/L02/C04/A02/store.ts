import { atom } from 'recoil';

export const L02C04A02 = atom<TL02C04A02>({
  key: 'L02C04A02',
  default: {
    p01: {
      answer1: 0,
      solution1: 1,
      answer2: 0,
      solution2: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      errorAnswers: ['', '', ''],
      correctAnswers: ['', '', ''],
      errorSolutions: ['85%', '$20', 'hair conditioner'],
      correctSolutions: ['90%', '$30', 'hand cream'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C04A02 = {
  p01: {
    answer1: number;
    solution1: number;
    answer2: number;
    solution2: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    errorAnswers: string[];
    correctAnswers: string[];
    errorSolutions: string[];
    correctSolutions: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
