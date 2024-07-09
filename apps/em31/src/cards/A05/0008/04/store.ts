import { atom } from 'recoil';

export const A05_0008_04 = atom({
  key: 'A05_0008_04',
  default: {
    p01: {
      answer1: '',
      answer2: '',

      solution1: '7',
      solution2: '30',

      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',

      solution1: '8',
      solution2: '7',
      solution3: '30',

      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      canvasPath1: '',
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
