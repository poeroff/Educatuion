import { atom } from 'recoil';

export const L01C12A07 = atom<TL01C12A07>({
  key: 'L01C12A07',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      isSubmitted: false,
    },
  },
});

type TL01C12A07 = {
  p01: {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    answer5: string;
    isSubmitted: boolean;
  };
};
