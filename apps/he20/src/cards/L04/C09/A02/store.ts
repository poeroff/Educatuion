import { atom } from 'recoil';

export const L04C09A02 = atom<TL04C09A02>({
  key: 'L04C09A02',
  default: {
    p02: {
      answer: [''],
      solution: ['manners'],
      isCorrect: false,
      isSubmitted: false,
      wordArr: ['feelings', 'language', 'manners', 'permission', 'privacy', 'respect'],
    },
    p03: {
      answer: ['', ''],
      solution: ['language', 'feelings'],
      isCorrect: false,
      isSubmitted: false,
      wordArr: ['feelings', 'language', 'manners', 'permission', 'privacy', 'respect'],
    },
    p04: {
      answer: ['', ''],
      solution: ['privacy', 'permission'],
      isCorrect: false,
      isSubmitted: false,
      wordArr: ['feelings', 'language', 'manners', 'permission', 'privacy', 'respect'],
    },
    p05: {
      answer: [''],
      solution: ['respect'],
      isCorrect: false,
      isSubmitted: false,
      wordArr: ['feelings', 'language', 'manners', 'permission', 'privacy', 'respect'],
    },
  },
});

type TL04C09A02 = {
  p02: IL04C09A02;
  p03: IL04C09A02;
  p04: IL04C09A02;
  p05: IL04C09A02;
};

interface IL04C09A02 {
  answer: string[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
  wordArr: string[];
}
