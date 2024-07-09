import { atom } from 'recoil';

export const B03_0005_60 = atom({
  key: 'B03000560',
  default: {
    p01: {
      answer: '',
      solution: '2',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', ''],
      solution: ['3', '4', '6'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: [''],
      solution: ['9'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
