import { atom } from 'recoil';

export const L01C03A02a = atom({
  key: 'L01C03A02a',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: 'concern',
      solution2: 'worrying',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      errorAnswers: ['', '', ''],
      correctAnswers: ['', '', ''],
      errorSolutions: ['singing', 'danced at', 'sorry'],
      correctSolutions: ['dance', 'organized', 'grateful'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
