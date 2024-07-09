import { atom } from 'recoil';

export const FileSampleCardStore = atom({
  key: 'FileSampleCard',
  default: {
    p01: {
      isSubmitted: false,
    },
  },
});
