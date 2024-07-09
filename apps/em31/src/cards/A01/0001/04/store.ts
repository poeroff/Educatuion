import { atom } from 'recoil';

export const A01000104Atom = atom<TA01000104>({
  key: 'A01000104',
  default: {
    P02: {
      isSubmitted: false,
      questions: [
        {
          solution: 62,
          isCorrect: false,
        },
        {
          solution: 45,
          isCorrect: false,
        },
      ],
    },
    P03: {
      isSubmitted: false,
      questions: [
        {
          solution: 31,
          isCorrect: false,
        },
        {
          solution: 28,
          isCorrect: false,
        },
      ],
    },
  },
});

type TA01000104 = {
  P02: IPage;
  P03: IPage;
};

interface IPage {
  isSubmitted: boolean;
  isInited?: boolean;
  questions: IQuestion[];
}
interface IQuestion {
  answer?: number | '';
  solution?: number;
  isCorrect?: boolean;
}
