import { atom } from 'recoil';

export const B01_0005_30 = atom({
  key: 'B01000530',
  default: {
    p01: {
      answer: '',
      solution: '1',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: ['286-141', '286-141=145'],
      solution2: '145',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: '649',
      solution2: '235',
      isCorrect1: false,
      isCorrect2: false,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
