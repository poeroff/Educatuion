import { atom } from 'recoil';

const C04000240State = atom({
  key: 'C04000240',
  default: {
    P01: {
      input1: '',
      input2: '',
      input3: '',
      isAnswer1Correct: false,
      isAnswer2Correct: false,
      isAnswer3Correct: false,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export default C04000240State;
