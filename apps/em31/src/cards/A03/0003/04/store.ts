import { atom } from 'recoil';

export const A03_0003_04 = atom<TA03000304>({
  key: 'A03_0003_04',
  default: {
    p01: {
      solution: ['2개씩 5번 덜어 낼 수 있습니다.'],
      canvasDataURL: '',
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', '', '', ''],
      solution: ['2', '2', '2', '2', '2'],
      isCorrect: [false, false, false, false, false],
      isAllCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: {
        value1: '',
      },
      solution: [{ value1: '5' }],
      commentary: '5입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA03000304 = {
  p01: IA03_0003_0401;
  p02: IA03_0003_0402;
  p03: IA03_0003_0403;
};

interface IA03_0003_0401 {
  solution: string[];
  canvasDataURL: string;
  isSubmitted: boolean;
}
interface IA03_0003_0402 {
  answer: string[];
  solution: string[];
  isCorrect: boolean[];
  isAllCorrect: boolean;
  isSubmitted: boolean;
}
interface IA03_0003_0403 {
  answer: { [key: string]: string };
  solution: { [key: string]: string }[];
  commentary: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
