import { atom } from 'recoil';

export const B04_0003_30 = atom({
  key: 'B04000330',
  default: {
    p01: {
      answer1: {
        value: '',
        solution: '44',
        isCorrect: false,
      },
      answer2: {
        value: '',
        solution: '88',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: {
        value: '',
        solution: ['23×3=69', '3×23=69', '23×3', '3×23'],
        isCorrect: false,
      },
      answer2: {
        value: '',
        solution: '69',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: {
        value: '',
        solution: '민서',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});
