import { atom } from 'recoil';

export const L02Sp03_2 = atom<TA01000404>({
  key: 'L02Sp03_2',
  default: {
    P05: {
      userAnswer: -1,
      isSubmitted: false,
      isAllCorrect: false,
    },
    P06: {
      userAnswer: -1,
      isSubmitted: false,
      isAllCorrect: false,
    },
    P09: {
      userAnswer: '',
      isSubmitted: false,
      isAllCorrect: false,
    },
    P10: {
      userAnswer: '',
      isSubmitted: false,
      isAllCorrect: false,
    },
    P21: {
      userAnswer: [],
      isSubmitted: false,
      isAllCorrect: false,
    },
    P22: {
      userAnswer: [],
      isSubmitted: false,
      isAllCorrect: false,
    },
    P23: {
      userAnswer: [],
      isSubmitted: false,
      isAllCorrect: false,
    },
    P24: {
      userAnswer: [],
      isSubmitted: false,
      isAllCorrect: false,
    },
  },
});

type TA01000404 = {
  [key: string]: {
    userAnswer: string | string[] | number | number[];
    isSubmitted: boolean;
    isAllCorrect: boolean;
  };
};
