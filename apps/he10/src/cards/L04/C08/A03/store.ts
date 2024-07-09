import { atom } from 'recoil';

export const HE20L04C08A03Atom = atom<THE20L04C08A03>({
  key: 'HE20L04C08A03',
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

type THE20L04C08A03 = {
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
