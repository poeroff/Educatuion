import { atom } from 'recoil';

export const C01_0011_31 = atom({
  key: 'C01001131',
  default: {
    p01: {
      answer: ['', '', '', ''],
      solution: ['biggerRight', 'equal', 'biggerLeft', 'biggerRight'],
      isCorrect: [false, false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});

export default C01_0011_31;
