import { atom } from 'recoil';

export const L02C09A02 = atom<TL02C09A02>({
  key: 'L02C09A02',
  default: {
    p02: {
      answer: '',
      solution: 'Witi lhimaera',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'restore',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'sing',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'listening',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: 'traditions',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

interface IL02C09A02 {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}

type TL02C09A02 = {
  p02: IL02C09A02;
  p03: IL02C09A02;
  p04: IL02C09A02;
  p05: IL02C09A02;
  p06: IL02C09A02;
};
