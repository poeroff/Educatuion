import { atom } from 'recoil';

type Tpage = {
  [key: string]: string | boolean;
  answer1: '';
  answer2: '';
  answer3: '';
  answer4: '';
  isSubmitted: boolean;
};

interface IL01C09A03 {
  p01: Tpage;
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
  p03: Tpage;
}

export const L01C09A03 = atom<IL01C09A03>({
  key: 'L01C09A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      isSubmitted: false,
    },
  },
});
