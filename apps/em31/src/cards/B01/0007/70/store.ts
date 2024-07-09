import { atom } from 'recoil';

const B01000770State = atom({
  key: 'B01000770State',
  default: {
    p01: {
      input1: '',
      input2: '',
      isSubmitted: false,
    },
  },
});

export default B01000770State;
