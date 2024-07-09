import { atom } from 'recoil';

export const C01_0011_35 = atom({
  key: 'C01001135',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: ['596+914=1510', '914+596=1510', '596+914', '914+596'],
      solution2: '1510',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export default C01_0011_35;
