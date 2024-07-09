import { EDefaultInequalitySignType } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const STC01000252 = atom({
  key: 'C01000252',
  default: {
    p01: {
      answer: 'default',
      solution: 'biggerRight',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
