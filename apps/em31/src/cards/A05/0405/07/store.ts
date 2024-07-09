import { atom } from 'recoil';

export const A05040507_store = atom({
  key: 'A05040507',
  default: {
    P01: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});
