import { atom } from 'recoil';

export const B01001150_store = atom({
  key: 'B01001150',
  default: {
    P01: {
      answer: '',
      solution: '643',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: '',
      solution: '298',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: '',
      solution: '941',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
