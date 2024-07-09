import { atom } from 'recoil';

export const L01C08A06 = atom<TL01C08A06>({
  key: 'L01C08A06',
  default: {
    p01: {
      values: ['', ''],
      solution: ['(3) aiming', 'to aim'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C08A06 = {
  p01: {
    values: Array<string>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
