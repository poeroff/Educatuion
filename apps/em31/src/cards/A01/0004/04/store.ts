import { atom } from 'recoil';

export const A01_0004_04 = atom<TA01000404>({
  key: 'A01_0004_04',
  default: {
    p01: {
      answer: {
        value1: '',
      },
      solution: [{ value1: '256+378' }, { value1: '378+256' }],
      commentary: '$(필요한\\:블록\\:수)=(지금까지\\:쌓은\\:블록\\:수)+(집을\\:완성하는데\\:더\\:필요한\\:블록\\:수)=256+378$',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: { value1: '6', value2: '3', value3: '4' },
      commentary: '백 모형은 6개, 십 모형은 3개, 일 모형은 4개입니다.',
      isCorrect: [false, false, false],
      isSubmitted: false,
    },
    p03: {
      answers: {
        value1: '',
        value2: '',
        value3: '',
      },
      solutions: [
        { value1: '256', value2: '378', value3: '634' },
        { value1: '378', value2: '256', value3: '634' },
      ],
      commentary: '$256+378=634$ 이므로 634개입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA01000404 = {
  p01: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  p03: {
    answers: { [key: string]: string };
    solutions: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
