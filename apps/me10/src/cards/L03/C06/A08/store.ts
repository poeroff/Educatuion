import { atom } from 'recoil';

export const L03C06A08 = atom<TL03C06A08>({
  key: 'L03C06A08',
  default: {
    p02: {
      dropArr: ['member', 'coach'],
      answer: [''],
      solution: ['member'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL03C06A08 = {
  p02: IL03C06A08;
};

interface IL03C06A08 {
  dropArr: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
