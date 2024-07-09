import { atom } from 'recoil';

export const A01001003Store = atom({
  key: 'A01001003',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: '416',
      solution2: '135',
      solution3: ['416+135=551', '135+416=551'],
      solution4: '551',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: ['416+135=551', '135+416=551'],
      solution2: '551',
      canvasDataURL: '',
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: '287',
      solution2: '121',
      solution3: ['287-121=166'],
      solution4: '166',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer1: '',
      answer2: '',
      solution1: ['287-121=166'],
      solution2: '166',
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
