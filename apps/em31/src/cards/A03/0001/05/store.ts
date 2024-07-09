import { atom } from 'recoil';

const A03000105State = atom({
  key: 'A03000105State',
  default: {
    p02: {
      input: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      inputs: ['', '', '', ''],
      isCorrectArr: [false, false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
    p04: {
      inputs: ['', ''],
      isCorrectArr: [false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
    p05: {
      inputs: ['', ''],
      isCorrectArr: [false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});

export default A03000105State;
