import { atom } from 'recoil';

export const A01_0007_08 = atom<TA01_0007_08>({
  key: 'EM31A01000708',
  default: {
    p01: {
      userInputs: ['', '', '', '', '', '', '', ''],
      correctAnswers: ['5', '8', '9', '1', '2', '3', '376', '68'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TA01_0007_08 = {
  p01: {
    userInputs: string[];
    correctAnswers: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
