import { atom } from 'recoil';

export const A03_0003_05 = atom<TA03000305>({
  key: 'A03_0003_05',
  default: {
    p01: {
      answer1: [],
      solution1: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: '3',
      solution2: '3',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answers: {
        value1: '',
        value2: '',
        value3: '',
      },
      solutions: [{ value1: '15', value2: '5', value3: '3' }],
      commentary: '15÷5=3입니다.',
      isCorrect: false,
      isCorrectArr: { value1: false, value2: false, value3: false },
      isSubmitted: false,
    },
  },
});

type TA03000305 = {
  p01: IA03_0003_0501;
  p02: IA03_0003_0502;
  P03: IA03_0003_0503;
};

interface IA03_0003_0501 {
  answer1: number[];
  solution1: number;
  isCorrect: boolean;
  isSubmitted: boolean;
}
interface IA03_0003_0502 {
  answer1: string;
  answer2: string;
  solution1: string;
  solution2: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
interface IA03_0003_0503 {
  answers: { [key: string]: string };
  solutions: { [key: string]: string }[];
  commentary: string;
  isCorrect: boolean;
  isCorrectArr: { [key: string]: boolean };
  isSubmitted: boolean;
}

export default A03_0003_05;
