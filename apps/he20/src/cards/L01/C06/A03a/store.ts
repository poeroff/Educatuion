import { atom } from 'recoil';

export const L01C06A03a = atom<Record<'p02', IL01C06A03a>>({
  key: 'L01C06A03a',
  default: {
    p02: {
      answer: '',
      solution: 'They decided to go to an animal sanctuary.',
      isSubmitted: false,
    },
  },
});

export interface IL01C06A03a {
  answer: string;
  solution: string;
  isSubmitted: boolean;
}
