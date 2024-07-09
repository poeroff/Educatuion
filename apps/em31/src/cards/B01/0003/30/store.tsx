import { atom } from 'recoil';

export const B01000330_Atom = atom({
  key: 'B01000330',
  default: {
    p01: {
      answer: '',
      solution: '756',
      isCorrect: false,
      isSubmitted: false,
      data: [
        {
          contents: '',
          userAnswer: false,
        },
      ],
    },
    p02: {
      inputData: [{ isAnswer: false }],
      data: [
        {
          contents: '',
          userAnswer: false,
        },
      ],
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '3',
      solution2: '7',
      solution3: '6',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: '581',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
