import { atom } from 'recoil';

export const C01_0001_20 = atom({
  key: 'C01000120',
  default: {
    p02: {
      answer1: {
        value: '',
        solution: '1',
        isCorrect: false,
      },

      answer2: {
        value: '',
        solution: '1',
        isCorrect: false,
      },
      answer3: {
        value: '',
        solution: '5',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },

    p04: {
      answer1: {
        value: '',
        solution: '7',
        isCorrect: false,
      },

      answer2: {
        value: '',
        solution: '7',
        isCorrect: false,
      },
      answer3: {
        value: '',
        solution: '1',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});
