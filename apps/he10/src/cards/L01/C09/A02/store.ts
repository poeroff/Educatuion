import { atom } from 'recoil';

export const L01C09A02 = atom({
  key: 'L01C09A02',
  default: {
    p02: {
      answer: '',
      solution: 'subjects',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'prioritize',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: ['', ''],
      solution: ['mind map', 'memory'],
      results: [false, false],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'study',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
