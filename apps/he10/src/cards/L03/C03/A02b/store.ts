import { atom } from 'recoil';

export const L03C03A02b = atom<TL03C03A02b>({
  key: 'L03C03A02b',
  default: {
    p01: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: true,
      solution2: false,
      solution3: true,
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      dropArr1: ['under', 'above'],
      dropArr2: ['heard', 'disappeared'],
      dropArr3: ['curved', 'straight'],
      answer: ['', '', ''],
      solution: ['under', 'heard', 'curved'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C03A02b = {
  p01: {
    answer1: boolean | undefined;
    answer2: boolean | undefined;
    answer3: boolean | undefined;
    solution1: boolean;
    solution2: boolean;
    solution3: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: IL03C03A02bDrop;
};

interface IL03C03A02bDrop {
  dropArr1: string[];
  dropArr2: string[];
  dropArr3: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
