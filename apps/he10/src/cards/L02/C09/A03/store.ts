import { atom } from 'recoil';

export const L02C09A03 = atom({
  key: 'L02C09A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});
