import { atom } from 'recoil';

export const A05_0008_05 = atom({
  key: 'A05_0008_05',
  default: {
    p01: {
      answer1: '',
      answer2: '',

      solution1: '15',
      solution2: '20',

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

      solution1: '5',
      solution2: '15',
      solution3: '20',

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
