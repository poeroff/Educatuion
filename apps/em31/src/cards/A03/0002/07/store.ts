import { atom } from 'recoil';

export const A03_0002_07 = atom({
  key: 'A03000207',
  default: {
    p01: {
      answer: ['', '', ''],
      solution: ['2', '3', '2'],
      isCorrect: [false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});

export default A03_0002_07;
