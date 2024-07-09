import { atom } from 'recoil';

export const L01C04A02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    answers: string[];
    isCorrect?: boolean;
  };
}>({
  key: 'L01C04A02',
  default: {
    p02: {
      isSubmitted: false,
      answers: [''],
      isCorrect: false,
    },
    p03: {
      isSubmitted: false,
      answers: ['', '', ''],
    },
  },
});
