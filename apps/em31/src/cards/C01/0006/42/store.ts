import { atom } from 'recoil';

export const C01_0006_42 = atom({
  key: 'C01000642',
  default: {
    P01: {
      answers: {
        value1: '',
        value2: '',
        value3: '',
      },
      solutions: [{ value1: '857', value2: '471', value3: '386' }],
      commentary: '$(어떤\\:수)+471=857 > (어떤\\:수)=857-471=386$',
      isCorrect: false,
      isCorrectArr: { value1: false, value2: false, value3: false },
      isSubmitted: false,
    },
  },
});
