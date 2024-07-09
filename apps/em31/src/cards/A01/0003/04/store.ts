import { atom } from 'recoil';

export const A01_0003_04 = atom({
  key: 'A01_0003_04',
  default: {
    p01: {
      answer: '',
      solution: ['127+215', '215+127'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '3',
      solution2: '4',
      solution3: '2',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: ['127', '215'],
      solution2: ['215', '127'],
      solution3: '342',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
