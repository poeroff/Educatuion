import { EChipButtonType } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C06A05b = atom({
  key: 'L03C06A05b',
  default: {
    p02: {
      userAnswer: EChipButtonType.EMPTY,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
