import { atom } from 'recoil';

export const L02C08A05bAtom = atom<TL02C08A05b>({
  key: 'HE20L02C08A05b',
  default: {
    P01: {
      isSubmitted: false,
      question: {
        answer: '',
        isCorrect: false,
      },
    },
    P02: {
      isSubmitted: false,
      question: {
        answer: '',
        isCorrect: false,
      },
    },
    P03: {
      isSubmitted: false,
      question: {
        answer: '',
        isCorrect: false,
      },
    },
    P04: {
      isSubmitted: false,
      question: {
        answer: '',
        isCorrect: false,
      },
    },
    P05: {
      isSubmitted: false,
      question: {
        answer: '',
        isCorrect: false,
      },
    },
  },
});

type TL02C08A05b = {
  P01: IPage;
  P02: IPage;
  P03: IPage;
  P04: IPage;
  P05: IPage;
};

interface IPage {
  isSubmitted: boolean;
  question: IQuestion;
}
interface IQuestion {
  answer?: string;
  isCorrect?: boolean;
}
