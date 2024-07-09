import { atom } from 'recoil';

export const A03_0003_07 = atom({
  key: 'A03000307',
  default: {
    p01: {
      answer: ['', '', ''],
      solution: ['5', '2', '3'],
      isCorrect: [false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});

export default A03_0003_07;
