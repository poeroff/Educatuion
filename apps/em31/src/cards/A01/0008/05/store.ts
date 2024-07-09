import { atom } from 'recoil';

export const A01_0008_05 = atom<TA01_008_05>({
  key: 'EM31A01000805',
  default: {
    p01: {
      userInputs: '',
      isSubmitted: false,
    },
    p02: {
      userInputs: ['', '', ''],
      isSubmitted: false,
    },
    p03: {
      canvasDataURL: '',
      isSubmitted: false,
    },
    p04: {
      answers: {
        value1: '',
        value2: '',
        value3: '',
      },
      solutions: { value1: '700', value2: '198', value3: '502' },
      isCorrectArr: { value1: false, value2: false, value3: false },
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA01_008_05 = {
  p01: {
    userInputs: string;
    isSubmitted: boolean;
  };
  p02: {
    userInputs: string[];
    isSubmitted: boolean;
  };
  p03: {
    canvasDataURL: string;
    isSubmitted: boolean;
  };
  p04: {
    answers: { [key: string]: string };
    solutions: { [key: string]: string };
    isCorrect: boolean;
    isCorrectArr?: { [key: string]: boolean };
    isSubmitted: boolean;
  };
};
