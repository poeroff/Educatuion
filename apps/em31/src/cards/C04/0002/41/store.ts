import { atom } from 'recoil';

const C04000241State = atom({
  key: 'C04000241',
  default: {
    P01: {
      input: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export default C04000241State;
