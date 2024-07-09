import { atom } from 'recoil';

const C04000242State = atom({
  key: 'C04000242',
  default: {
    P01: {
      input: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export default C04000242State;
