import { atom } from 'recoil';

const C01000242State = atom({
  key: 'C01000242State',
  default: {
    p01: {
      input1: ['', '', ''],
      input2: ['', '', ''],
      input3: '',
      isSubmitted: false,
    },
  },
});

export default C01000242State;
