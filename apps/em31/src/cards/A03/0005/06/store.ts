import { atom } from 'recoil';

export const A03_0005_06 = atom({
  key: 'A03000506',
  default: {
    p01: {
        answer1: {
          value: '',
          solution: '8',
          isCorrect: false,
        },
        answer2: {
          value: '',
          solution: '5',
          isCorrect: false,
        },
        answer3: {
          value: '',
          solution: '6',
          isCorrect: false,
        },
        isAllCorrect: false,
  
        isSubmitted: false,
      },
  },
});
