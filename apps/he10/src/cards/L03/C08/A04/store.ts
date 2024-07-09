import { atom } from 'recoil';

export const L03C08A04 = atom<Record<'p02', IL03C08A04>>({
  key: 'L03C08A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

export interface IL03C08A04 {
  answer: string;
  isSubmitted: boolean;
}
