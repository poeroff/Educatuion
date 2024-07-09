import { atom } from 'recoil';

export const C02_0006_20 = atom<TC02000620>({
  key: 'C02000620',
  default: {
    P02: {
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC02000620 = {
  P02: {
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
