import { atom } from 'recoil';

export const C01_0004_20 = atom({
  key: 'C01_0004_20',
  default: {
    p01: {},
    p02: {
      input1: ['', '', ''],
      input2: ['', '', '', ''],
      input3: [''],
      input4: [''],
      isSubmitted: false,
    },
    p03: {
      input1: [''],
      isSubmitted: false,
    },
    p04: {
      input1: [0],
      input2: [0],
      isSubmitted: false,
    },
  },
});
