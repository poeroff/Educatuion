import { atom } from 'recoil';

export const L01C09A03 = atom<TL01C09A03>({
  key: 'L01C09A03',
  default: {
    p01: {
      dropArr: ['is', 'am', 'are', 'not'],
      answer: ['', '', '', '', ''],
      solution: ['am', 'is', 'not', 'is', 'are'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C09A03 = {
  p01: IL01C09A03;
};

interface IL01C09A03 {
  dropArr: string[];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
}
