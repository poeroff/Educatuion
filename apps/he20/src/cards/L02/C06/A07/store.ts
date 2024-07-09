import { atom } from 'recoil';

export const HE20L02C06A07Atom = atom<THE20L02C06A07>({
  key: 'HE20L02C06A07',
  default: {
    P02: {
      isSubmitted: false,
      questions: [
        {
          answer: '',
          isCorrect: false,
        },
        {
          answer: '',
          isCorrect: false,
        },
        {
          answer: '',
          isCorrect: false,
        },
      ],
    },
  },
});

type THE20L02C06A07 = {
  P02: IPage;
};

interface IPage {
  isSubmitted: boolean;
  questions: IQuestion[];
}
interface IQuestion {
  answer?: string;
  isCorrect?: boolean;
}
