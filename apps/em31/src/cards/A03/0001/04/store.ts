import { atom } from 'recoil';

const A03000104State = atom({
  key: 'A03000104State',
  default: {
    p02: {
      inputs: ['', '', '', ''],
      isCorrectArr: [false, false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
    p03: {
      inputs: ['', ''],
      isCorrectArr: [false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});

export default A03000104State;
