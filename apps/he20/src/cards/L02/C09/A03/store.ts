import { atom } from 'recoil';

export const L02C09A03 = atom<TL02C09A03>({
  key: 'L02C09A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: '1) to request an exchange for a plant I bought',
      solution2: '2) When I received the plant, I found that the pot was broken.',
      solution3: '3) More attention should have been paid to the packaging.',
      solution4: '4) A new plant should be sent as a replacement to my address.',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', '', ''],
      isSubmitted: false,
    },
  },
});

type TL02C09A03 = {
  p01: IL02C09A03P1;
  p02: IL02C09A03P2;
  p03: IL02C09A03P3;
};

export interface IL02C09A03P1 {
  [key: string]: string | boolean;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  solution1: string;
  solution2: string;
  solution3: string;
  solution4: string;
  isSubmitted: boolean;
}

interface IL02C09A03P2 {
  answer: string;
  isSubmitted: boolean;
}

interface IL02C09A03P3 {
  answer: string[];
  isSubmitted: boolean;
}
