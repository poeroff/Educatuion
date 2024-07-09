import { atom } from 'recoil';

export const A01_0007_07 = atom<TA01_0007_07>({
  key: 'EM31A01000707',
  default: {
    p01: {
      userInputs: ['', '', '', '', '', '', '', ''],
      correctAnswers: ['1', '8', '9', '4', '8', '2', '248', '267'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TA01_0007_07 = {
  p01: {
    userInputs: string[];
    correctAnswers: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
