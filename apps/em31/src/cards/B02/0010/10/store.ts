import { atom } from 'recoil';

export const B02_0010_10 = atom({
  key: 'B02_0010_10',
  default: {
    P02: {
      answer: '',
      solution: '2',
      isSubmitted: false,
      isCorrect: false,
    },
    P03: {
      answer: '',
      solution: '9',
      isSubmitted: false,
      isCorrect: false,
    },
    P04: {
      answer: ['', '', ''],
      solution: ['9', '4', '1'],
      isSubmitted: false,
      isCorrect: false,
    },
    P05: {
      answer: '',
      solution: '14',
      isSubmitted: false,
      isCorrect: false,
    },
    P06: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
