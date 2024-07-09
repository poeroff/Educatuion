import { atom } from 'recoil';

export const L01C09A03b = atom({
  key: 'L01C09A03b',
  default: {
    p01: {
      dropArr: [
        ['am', 'are'],
        ['are not', 'not are'],
        ['is', 'am'],
      ],
      answer: ['', '', ''],
      solution: ['am', 'are not', 'is'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
