import { atom } from 'recoil';

export const C01000750_store = atom({
  key: 'C01000750',
  default: {
    P01: {
      answer: ['', '', '', '', '', '', '', ''],
      solution: ['9', '8', '1', '265', '7', '1', '5', '594'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
