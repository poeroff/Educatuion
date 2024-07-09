import { atom } from 'recoil';

export const B02000950_store = atom({
  key: 'B02000950',
  default: {
    P01: {
      answer: ['', ''],
      solution: ['4', '16'],
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: '',
      solution: '20',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: '',
      solution: '10',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
