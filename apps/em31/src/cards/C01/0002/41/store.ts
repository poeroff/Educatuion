import { atom } from 'recoil';

const C01000241State = atom({
  key: 'C01000241State',
  default: {
    p01: {
      input1: '',
      input2: '',
      isSubmitted: false,
    },
  },
});

export default C01000241State;
