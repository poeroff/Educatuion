import { atom } from 'recoil';

type answerdType2 = {
  answer: number[];
  solution: number[],
  isCorrect: boolean;
  isSubmitted: boolean;
};

type answerdType3 = {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};
interface IL03SP04_2 {
  p07: answerdType3;
  p08: answerdType3;
  p11: answerdType2;
  p12: answerdType2;
}

export const L03SP04_2 = atom<IL03SP04_2>({
  key: 'L03SP04-2',
  default: {
      p07: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p11: {
      answer: [] as number[],
      solution: [3, 0, 2, 1, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: [] as number[],
      solution: [2, 4, 3, 0, 1],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
