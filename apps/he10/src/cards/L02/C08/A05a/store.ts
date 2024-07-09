import { atom } from 'recoil';

export const L02C08A05a = atom<TL02C08A05a>({
  key: 'L02C08A05a',
  default: {
    p01: {
      answer: '',
      solution: 'as if it touched',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'as if she had',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'as if they were',
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'as if fairies lived',
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'as if there were',
      isSubmitted: false,
    },
  },
});

type TL02C08A05a = {
  p01: IL02C08A05a;
  p02: IL02C08A05a;
  p03: IL02C08A05a;
  p04: IL02C08A05a;
  p05: IL02C08A05a;
};

interface IL02C08A05a {
  answer: string;
  solution: string;
  isSubmitted: boolean;
}
