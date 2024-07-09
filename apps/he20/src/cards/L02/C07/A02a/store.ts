import { atom } from 'recoil';

type pageDataType = {
  [key: string]: string | boolean | undefined;
  answer?: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IL02C07A02a {
  p02: pageDataType;
  p03: pageDataType;
  p04: pageDataType;
  p05: pageDataType;
}

export const L02C07A02a = atom<IL02C07A02a>({
  key: 'L02C07A02a',
  default: {
    p02: {
      answer: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer1: '',
      answer2: '',
      answer3: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
