import { atom } from 'recoil';

export const L02C08A05 = atom<Record<TL02C08A05Keys, IL02C08A05>>({
  key: 'L02C08A05',
  default: {
    p01: {
      answer: '',
      solutions: ['pay', 'should pay'],
      solutionDisplay: '(should) pay',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solutions: ['received'],
      solutionDisplay: 'received',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solutions: ['wait', 'should wait'],
      solutionDisplay: '(should) wait',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solutions: ['improves'],
      solutionDisplay: 'improves',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solutions: ['raise', 'should raise'],
      solutionDisplay: '(should) raise',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TL02C08A05Keys = 'p01' | 'p02' | 'p03' | 'p04' | 'p05';

export interface IL02C08A05 {
  answer: string;
  solutions: string[];
  solutionDisplay: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
