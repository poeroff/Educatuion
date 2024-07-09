import { atom } from 'recoil';

type answerdType1 = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};
type answerdType3 = {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};
interface IL03SP04_1 {
  p05: answerdType3;
  p06: answerdType3;
  p07: answerdType1;
  p08: answerdType1;
  p09: answerdType3;
  p10: answerdType3;
  p11: answerdType3;
}
export const L03SP04_1 = atom<IL03SP04_1>({
  key: 'L03SP04-1',
  default: {
    p05: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p07: {
      answer: '',
      solution: 'Never did I expect to see my old friend at the ceremony.',
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: '',
      solution: 'Under the tall tree lies a wooden table.',
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p11: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
