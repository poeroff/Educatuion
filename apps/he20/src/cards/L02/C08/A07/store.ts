import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02C08A07 = atom<TL02C08A07>({
  key: 'L02C08A07',
  default: {
    p02: {
      audioData: {
        1: {},
      },
      isSubmitted: false,
    },
  },
});

export type TL02C08A07 = {
  [key: string]: {
    audioData?: { [key in number]: IAudioData | null };
    isSubmitted: boolean;
  };
};
