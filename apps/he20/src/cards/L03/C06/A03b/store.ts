import { atom } from 'recoil';

export const HE20L03C06A03bAtom = atom<THE20L03C06A03b>({
  key: 'HE20L03C06A03b',
  default: {
    P02: {
      isSubmitted: false,
      questions: [
        {
          solution: 'artists',
          isCorrect: false,
        },
        {
          solution: 'challenges',
          isCorrect: false,
        },
      ],
    },
  },
});

type THE20L03C06A03b = {
  P02: IPage;
};

interface IPage {
  isSubmitted: boolean;
  isInited?: boolean;
  questions: IQuestion[];
}
interface IQuestion {
  answer?: string;
  solution?: string;
  isCorrect?: boolean;
}
