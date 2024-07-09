import { atom } from 'recoil';

const C01000240State = atom({
  key: 'C01000240State',
  default: {
    p01: {
      input1: '',
      input2: '',
      isSubmitted: false,
    },
  },
});

export default C01000240State;
