import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C08A07 = atom<TL01C08A07>({
  key: 'L01C08A07',
  default: {
    p02: {
      audioData: {
        1: {},
      },
      isSubmitted: false,
    },
  },
});

export type TL01C08A07 = {
  [key: string]: {
    audioData?: { [key in number]: IAudioData | null };
    isSubmitted: boolean;
  };
};
