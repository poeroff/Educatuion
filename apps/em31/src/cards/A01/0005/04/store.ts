import { atom } from 'recoil';

export const A01_0005_04 = atom<TA01000504>({
  key: 'A01_0005_04',
  default: {
    p01: {
      answer: {
        value1: '',
      },
      solution: [{ value1: '244-112' }],
      commentary: '$(도움\\:로봇\\:수)-(마음\\:로봇\\:수)=244-112$',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', ''],
      isSubmitted: false,
    },
    p03: {
      answers: {
        value1: '',
        value2: '',
        value3: '',
      },
      solutions: [{ value1: '244', value2: '112', value3: '132' }],
      commentary: '$244-112=132$이므로 132대 더 많습니다.',
      isCorrect: false,
      isCorrectArr: { value1: false, value2: false, value3: false },
      isSubmitted: false,
    },
  },
});

type TA01000504 = {
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: (string | undefined)[];
    isSubmitted: boolean;
  };
  p03: {
    answers: { [key: string]: string };
    solutions: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isCorrectArr?: { [key: string]: boolean };
    isSubmitted: boolean;
  };
};
