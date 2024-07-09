import { atom } from 'recoil';

export const L03C08A05 = atom<Record<TL03C08A05Keys, IL03C08A05>>({
  key: 'L03C08A05',
  default: {
    p01: {
      answer: '',
      solution: 'Jack often seeks advice from his closest friend Lisa, whom he deeply trusts.',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'Sarah hosted a personal gallery with her photographs, which was her childhood dream.',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'The athlete recalled the last Olympic Games, when he set a new world record.',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TL03C08A05Keys = 'p01' | 'p02' | 'p03';

export interface IL03C08A05 {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
