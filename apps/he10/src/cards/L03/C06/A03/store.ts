import { atom } from 'recoil';

export const L03C06A03 = atom<{
  [key: string]: {
    answers: string[];
    isSubmitted: boolean;
  };
}>({
  key: 'L03C06A03',
  default: {
    p02: {
      answers: ['', ''],
      isSubmitted: false,
    },
  },
});
