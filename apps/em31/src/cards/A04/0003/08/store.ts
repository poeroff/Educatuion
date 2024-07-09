import { atom } from 'recoil';

export const A04_0003_08 = atom({
  key: 'A04000308',
  default: {
    p01: {
      answer: [['', ''], ['', ''], [''], ['']],
      solution: [['8', '4'], ['9', '6'], ['68'], ['66']],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
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
    p06: {
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
    p07: {
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
