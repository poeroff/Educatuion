import { atom } from 'recoil';

const B01000450State = atom({
  key: 'B01000450State',
  default: {
    p01: {
      inputs: ['', '', ''],
      isSubmitted: false,
    },
    p02: {
      inputs: ['', '', '', ''],
      isSubmitted: false,
    },
    p03: {
      input: '',
      isSubmitted: false,
    },
    p04: {
      input: '',
      isSubmitted: false,
    },
    p05: {
      input: '',
      isSubmitted: false,
    },
    p06: {
      input: '',
      isSubmitted: false,
    },
  },
});

export default B01000450State;
