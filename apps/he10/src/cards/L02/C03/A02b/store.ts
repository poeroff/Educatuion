import { atom } from 'recoil';

export const L02C03A02b = atom<TL02C03A02b>({
  key: 'L02C03A02b',
  default: {
    p01: {
      dropArr: [['greeting', 'eating']],
      answer: [''],
      solution: ['greeting'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: [
        ['gifts', 'head', 'culture'],
        ['gifts', 'head', 'culture'],
        ['gifts', 'head', 'culture'],
      ],
      answer: ['', '', ''],
      solution: ['culture', 'gifts', 'head'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C03A02b = {
  p01: IL02C03A02b;
  p03: IL02C03A02b;
};

interface IL02C03A02b {
  dropArr: string[][];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
